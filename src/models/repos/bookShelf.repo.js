const { bookShelf_originalSchema } = require("../bookShelf_original.model");

class BookShelfRepo {
    static findById = async (id) => {
        return await bookShelf_originalSchema
            .findById(id)
            .lean();
    }
}

module.exports = BookShelfRepo;