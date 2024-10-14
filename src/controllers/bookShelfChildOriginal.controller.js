const { SuccessResponse } = require("../responseHandle/success.response");
const BookShelfChildOriginalService = require("../services/bookShelfChildOriginal.service");

class BookShelfChildOriginalController {
    getAll = async (req, res) => {
        new SuccessResponse({
            message: "Lấy thông tin thành công!!",
            data: await BookShelfChildOriginalService.getAll()
        }).send(res)
    }
    getById = async (req, res) => {
        new SuccessResponse({
            message: "Lấy thông tin thành công!!",
            data: await BookShelfChildOriginalService.getById(req.params.id)
        }).send(res)
    }
    update = async (req, res) => {
        new SuccessResponse({
            message: "Cập nhật thành công !!!",
            data: await BookShelfChildOriginalService.update(req.params.id, req.body)
        }).send(res)
    }
    filterByFatherId = async (req, res) => {

        new SuccessResponse({
            message: "Lọc theo giá sách!!",
            data: await BookShelfChildOriginalService.filterByFatherId(req.query.id)
        }).send(res)
    }
}

module.exports = new BookShelfChildOriginalController();