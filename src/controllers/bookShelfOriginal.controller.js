const { bookShelf_original } = require('../models/bookShelf_original.model')
const {SuccessResponse} = require('../responseHandle/success.response')
const BookShelfOriginalService = require('../services/bookShelfOriginal.service')


class BookShelfOriginalController {
    getAllBookShelfOriginal = async (req, res) => {
        new SuccessResponse({
            message: "Lấy thông tin thành công!!",
            data: await BookShelfOriginalService.getAll()
        }).send(res)
    }

    getBookShelf_originalById = async (req, res) => {
        new SuccessResponse({
            message: "Lấy thông tin thành công!!",
            data: await BookShelfOriginalService.getById(req.params.id),
        }).send(res)
    }
    updateBookShelf_original = async (req, res) => {
        new SuccessResponse({
            message: "Cập nhập thành công!!",
            data: await BookShelfOriginalService.update(req.params.id, req.body),
        }).send(res)
    }
}

module.exports = new BookShelfOriginalController()