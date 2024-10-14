const { SuccessResponse } = require("../responseHandle/success.response");
const BookOriginService = require("../services/bookOriginal.service");

class BookOriginController {
  getAll = async (req, res, next) => {
    const books = await BookOriginService.getAll();
    new SuccessResponse({
      message: "Lấy thông tin tất cả sách thành công",
      data: books,
    }).send(res);
  };

  getById = async (req, res, next) => {
    const book = await BookOriginService.getById(req.params.id);
    new SuccessResponse({
      message: "Lấy thông tin sách thành công",
      data: book,
    }).send(res);
  };

  update = async (req, res, next) => {
    const book = await BookOriginService.update(req.params.id, req.body);
    new SuccessResponse({
      message: "Cập nhật thông tin sách thành công",
      data: book,
    }).send(res);
  };

  create = async (req, res, next) => {
    const book = await BookOriginService.create(req.body);
    new SuccessResponse({
      message: "Tạo sách mới thành công",
      data: book,
    }).send(res);
  };

  exportExcel = async (req, res, next) => {
    const excelBuffer = await BookOriginService.exportExcel(); // Gọi hàm exportExcel để lấy buffer
    res.setHeader('Content-Disposition', 'attachment; filename="books.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
    // Gửi buffer dưới dạng file
    res.send(excelBuffer);
  };
}
module.exports = new BookOriginController();
