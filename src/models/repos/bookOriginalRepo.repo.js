const { book_originalSchema } = require("../book_original.model")

class BookOriginalRepo {
    static findById = async (id) => {
        return await book_originalSchema.findById(id).lean()
    }
    static countDocument = async (query) => {
        return book_originalSchema.countDocuments(query)
    }
}


module.exports = BookOriginalRepo