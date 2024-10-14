const { BadRequestError } = require("../responseHandle/error.response");
const {
  inventoryReceiptSchema,
} = require("../models/inventoryReceipt_original.model");
const BookOriginalRepo = require("../models/repos/bookOriginalRepo.repo");
const BookCopyService = require("./bookCopy.service");
const InventoryOriginRepo = require("../models/repos/inventory_original.repo");
const InventoryReceiptDetailOriginalService = require("./inventoryReceiptDetailOriginal.service");

class InventoryReceiptOriginalService {
  static create = async (data) => {
    const { details, name, supplier, reason, note } = data;
    for (const item of details) {
      const foundBookOriginal = await BookOriginalRepo.findById(
        item.bookOriginal
      );
      if (!foundBookOriginal) {
        throw new BadRequestError("Sách không tồn tại!");
      }
    }
    const inventoryReceipt = new inventoryReceiptSchema({
      name,
      supplier,
      reason,
      note,
    });
    await inventoryReceipt.save();
    const id = inventoryReceipt._id;
    for (const item of details) {
      await BookCopyService.insertMany({
        count: item.quantity,
        idBook: item.bookOriginal,
        prefix: item.prefix,
      });
      await InventoryOriginRepo.updateQuantityById({
        bookId: item.bookOriginal,
        total: item.quantity,
        quantityNotInShelf: item.quantity,
        upsert: true,
      });
      const payload = {
        quantity: item.quantity,
        bookOriginal: item.bookOriginal,
        inventoryReceipt: id,
      };
      await InventoryReceiptDetailOriginalService.insert(payload);
    }
    return inventoryReceipt;
  };
}

module.exports = InventoryReceiptOriginalService;
