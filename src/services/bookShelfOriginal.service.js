const {
  bookShelf_originalSchema,
} = require("../models/bookShelf_original.model");
const { BadRequestError } = require("../responseHandle/error.response");

class BookShelfOriginalService {
  static getAll = async () => {
    const bookShelfOriginals = await bookShelf_originalSchema.find().lean();
    if (!bookShelfOriginals) {
      throw new BadRequestError("Giá sách không tồn tại!");
    }
    return bookShelfOriginals;
  };

  static getById = async (id) => {
    const bookShelfOriginal = await bookShelf_originalSchema
      .findById(id)
      .lean();
    if (!bookShelfOriginal) {
      throw new BadRequestError("Giá sách không tồn tại!");
    }
    return bookShelfOriginal;
  };

  static update = async (id, data) => {
    if (!data) {
      return bookShelfOriginal;
    }
    delete data.school;
    delete data.ministry;
    delete data.department;
    const bookShelfOriginal = await bookShelf_originalSchema
      .findByIdAndUpdate(id, data, { new: true })
      .lean();
    if (!bookShelfOriginal) {
      throw new BadRequestError("Giá sách không tồn tại!");
    }
    return bookShelfOriginal;
  };
}

module.exports = BookShelfOriginalService;
