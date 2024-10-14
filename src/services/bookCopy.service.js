const { BOOK_COPY_NUM } = require("../configs/bookOriginal.config")
const { bookCopy_originalSchema } = require("../models/bookCopy_original.model")
const BookCopyRepo = require("../models/repos/bookCopy_original.repo")
const BookOriginalRepo = require("../models/repos/bookOriginalRepo.repo")
const { BadRequestError } = require("../responseHandle/error.response")

class BookCopyService {
    // tạo mã cá biệt lúc nhập sách
    static insertMany = async ({ count, idBook, prefix = '' }) => {
        const foundBookOriginal = await BookOriginalRepo.findById(idBook)
        if (!foundBookOriginal) {
            throw new BadRequestError('Sách không tồn tại!')
        }
        // xem đầu sách này đã có mã cá biệt nào hay chưa? có rồi thì lấy prefix đã có, chưa thì lấy theo prefix
        const foundBookCopy = await BookCopyRepo.findOneByBookId(idBook)
        // lấy số lượng các mã cá biệt của đầu sách này
        const countBookCopy = await BookCopyRepo.countDocument({ bookParent: idBook })
        if (foundBookCopy) {
            const idCopyCodeSplit = foundBookCopy.idCopyCode.split('.')
            // trước họ có nhập prefix thì lấy prefix, ko thì chuỗi rỗng
            prefix = idCopyCodeSplit.length == 3 ? idCopyCodeSplit[0] : ''
        }
        let listBookCopy = []
        for (let index = 0 + countBookCopy; index < count + countBookCopy; index++) {
            const newBookDocument = new bookCopy_originalSchema({
                idCopyCode: generatorIdCopyBook(prefix, index, foundBookOriginal.code),
                bookParent: idBook,
            })
            listBookCopy.push(newBookDocument)
        }
        const newListBook = await bookCopy_originalSchema.insertMany(listBookCopy)
        return newListBook
    }
}

/**
 * 
 * @param {String} prefix 
 * @param {Number} num 
 * @param {String} bookCode 
 * @returns 
 */

function generatorIdCopyBook(prefix = '', num, bookCode) {
    if (prefix.trim()) {
        return `${prefix}.${bookCode}.${num.toString().padStart(BOOK_COPY_NUM, 0)}`
    }
    return `${bookCode}.${num.toString().padStart(BOOK_COPY_NUM, 0)}`
}

module.exports = BookCopyService