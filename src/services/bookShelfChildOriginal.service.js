const { find } = require("lodash");
const {
  bookShelfChild_originalSchema,
} = require("../models/bookShelfChild_original.mode");
const { BadRequestError } = require("../responseHandle/error.response");
const BookShelfRepo = require("../models/repos/bookShelf.repo");

class BookShelfChildOriginalService {
  static getAll = async () => {
    const bookShelfChildOriginals = await bookShelfChild_originalSchema
      .find()
      .lean();
    if (!bookShelfChildOriginals) {
      throw new BadRequestError("Kệ sách không tồn tại");
    }
    return bookShelfChildOriginals;
  };

  static getById = async (id) => {
    const bookShelfChildOriginal = await bookShelfChild_originalSchema
      .findById(id)
      .lean();
    if (!bookShelfChildOriginal) {
      throw  new BadRequestError("Kệ sách không tồn tại");
    }
    return bookShelfChildOriginal;
  };

  static update = async (id, data) => {
    if (!data) {
      return bookShelfChildOriginal;
    }
    delete data.school;
    delete data.ministry;
    delete data.department;
    const bookShelfChildOriginal = await bookShelfChild_originalSchema
      .findByIdAndUpdate(id, data, { new: true })
      .lean();
    if (!bookShelfChildOriginal) {
      throw new BadRequestError("Kệ sách không tồn tại");
    }
    return bookShelfChildOriginal;
  };

  static filterByFatherId = async (id) => {
    const bookShelfFather = await BookShelfRepo.findById(id);
    if (!bookShelfFather) {
      throw new BadRequestError("Giá sách không tồn tại");
    }   

    const bookShelfChildOriginals = await bookShelfChild_originalSchema.find({bookShelfParent: id}).lean();

    return bookShelfChildOriginals;
  }
}

module.exports = BookShelfChildOriginalService;
