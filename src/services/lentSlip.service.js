const { BadRequestError } = require("../responseHandle/error.response");
const { lentSlipSchema } = require("../models/lentSlip.model");
const BookCopyRepo = require("../models/repos/bookCopy_original.repo");
const { PREFIX, CODE_NUM } = require("../configs/lentSlip.config");
const { padStart } = require("lodash");
const lentSlipDetailService = require("./lentSlipDetail.service");
const InventoryOriginRepo = require("../models/repos/inventory_original.repo");
const LentSlipDetailRepo = require("../models/repos/lentSlipDetail.repo");

class LentSlipService {
  static create = async (data) => {
    const { borrower, lender, note, details, status } = data;
    let totalBorrower = 0;
    for (const item of details) {
      // Check for duplicate book copies
      const foundBookCopy = await BookCopyRepo.findById(item.bookCopy);
      if (!foundBookCopy) {
        throw new BadRequestError("Mã cá biệt sách không tồn tại!");
      }
      if (foundBookCopy.status !== 1) {
        throw new BadRequestError("Sách này không thể mượn!");
      }
      totalBorrower += 1;
    }
    // // Generate lending slip code
    const countBook = await lentSlipSchema.countDocuments();
    const nextCodeNumber = countBook + 1;
    const code = `${PREFIX}${nextCodeNumber.toString().padStart(CODE_NUM, 0)}`;
    const slipStatus = totalBorrower > 0 ? 0 : status;
    // // Create and save lending slip
    const lentSlip = new lentSlipSchema({
      borrower,
      lender,
      note,
      details,
      code,
      totalBorrower,
      status: slipStatus,
    });
    await lentSlip.save();

    // Process lending slip details
    const id = lentSlip._id;
    for (const item of details) {
      const payload = {
        lentSlip: id,
        bookCopy: item.bookCopy,
        note: item.note,
      };
      await lentSlipDetailService.insert(payload);

      // Update book copy status and inventory
      const bookCopyUpdate = { status: 2 };
      const foundBookCopy = await BookCopyRepo.findByIdAndUpdate(
        item.bookCopy,
        bookCopyUpdate,
        { new: true }
      );
      const bookId = foundBookCopy.bookParent;
      await InventoryOriginRepo.updateQuantityById({
        bookId: bookId,
        quantityLent: 1,
        quantityInShelf: -1,
        total: 0,
      });
    }
    return lentSlip;
  };
  // Hàm trả sách
  static returnBook = async (id) => {
    const lentSlip = await lentSlipSchema.findById(id);
    if (!lentSlip) {
      throw new BadRequestError("Phiếu mượn không tồn tại!");
    }
    if (lentSlip.status === 1) {
      throw new BadRequestError("Phiếu mượn đã được trả!");
    }
    if (lentSlip.status === -1) {
      throw new BadRequestError("Phiếu mượn đã trả muộn!");
    }
    lentSlip.status = 1;
    lentSlip.returnDate = new Date();
    await lentSlip.save();

    // cập nhật trạng thái sách trong vé và số lượng sách trong kho
    const details = await LentSlipDetailRepo.findById(id);
    for (const item of details) {
      const bookCopyUpdate = { status: 1 };
      const foundBookCopy = await BookCopyRepo.findByIdAndUpdate(
        item.bookCopy,
        bookCopyUpdate,
        { new: true }
      );
      const bookId = foundBookCopy.bookParent;
      await InventoryOriginRepo.updateQuantityById({
        bookId: bookId,
        quantityLent: -1,
        quantityInShelf: 1,
        total: 0,
      });
    }
    return lentSlip;
  };
}

module.exports = LentSlipService;
