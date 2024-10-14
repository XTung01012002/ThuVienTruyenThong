const {
    inventoryExportSchema,
  } = require("../models/inventoryExport_original.model");
  const BookCopyRepo = require("../models/repos/bookCopy_original.repo");
  const BookOriginalRepo = require("../models/repos/bookOriginalRepo.repo");
  const InventoryOriginRepo = require("../models/repos/inventory_original.repo");
  const inventoryExportDetailOriginalRepo = require("../models/repos/inventoryExportDetailOriginal.repo");
  const { BadRequestError } = require("../responseHandle/error.response");
  
  class InventoryExportOriginalService {
  
    static create = async (data) => {
      let exportDetails = data.details;
    
      // Kiểm tra và xử lý từng sách trong chi tiết phiếu xuất
      for (const book of exportDetails) {
        // Kiểm tra sách có tồn tại không
        const bookCopy = await BookCopyRepo.findById(book.bookCopy);
        if (!bookCopy) {
          throw new BadRequestError("Không tìm thấy sách !");
        }
    
        // Kiểm tra số lượng sách xuất
        if (!book.quantity) {
          throw new BadRequestError("Số lượng sách xuất chưa nhập!");
        }
    
        // Kiểm tra trạng thái của sách
        if ([2, -1, -2].includes(bookCopy.status)) {
          throw new BadRequestError("Sách đang được mượn hoặc đã xuất !");
        }
      }
    
      // Xóa details trong data trước khi tạo phiếu xuất
      delete data.details;
    
      // Tạo phiếu xuất với data (đã bỏ details)
      const inventoryExport = await inventoryExportSchema.create(data);
      const inventoryExportId = inventoryExport._id;
    
      // Tạo chi tiết phiếu xuất
      const updatedDetails = exportDetails.map((item) => ({
        ...item,
        inventoryExport: inventoryExportId,
      }));
      const details = await inventoryExportDetailOriginalRepo.addMany(updatedDetails);
      
      // Nếu không tạo được chi tiết phiếu xuất, xóa phiếu xuất đã tạo và ném lỗi
      if (!details) {
        await inventoryExportSchema.findByIdAndDelete(inventoryExportId);
        throw new BadRequestError("Tạo phiếu xuất lỗi !");
      }
    
      // Cập nhật trạng thái và số lượng sách trong kho
      for (const item of updatedDetails) {
        const bookCopy = await BookCopyRepo.findById(item.bookCopy);
    
        let quantityNotInShelf = 0,
            quantityInShelf = 0,
            quantityLent = 0,
            quantityOutput = 0,
            quantityCancel = 0;
    
        // Cập nhật trạng thái và số lượng dựa trên trạng thái sách và loại phiếu xuất
        if (bookCopy.status === 0) {
          quantityNotInShelf = -1;
        } else {
          quantityInShelf = -1;
        }
    
        if (inventoryExport.type === 1) {
          quantityCancel = 1;
          bookCopy.status = -2;
        } else {
          bookCopy.status = -1;
          quantityOutput = 1;
        }
    
        // Cập nhật trạng thái sách
        await BookCopyRepo.findByIdAndUpdate(bookCopy._id, bookCopy);
    
        // Cập nhật số lượng sách trong kho
        await InventoryOriginRepo.updateQuantityById({
          bookId: bookCopy.bookParent,
          total: quantityNotInShelf + quantityInShelf + quantityLent + quantityOutput + quantityCancel,
          quantityNotInShelf,
          quantityInShelf,
          quantityLent,
          quantityOutput,
          quantityCancel,
        });
      }
    
      return { inventoryExport, details };
    };
    
  }
  
  module.exports = InventoryExportOriginalService;
  