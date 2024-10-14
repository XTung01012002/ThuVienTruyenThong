const { bookCopy_originalSchema } = require("../bookCopy_original.model");

class BookCopyRepo {
  // tìm sách theo mã cá biệt
  static findById = async (id) => {
    return bookCopy_originalSchema.findById(id).lean();
  };
  static findByIdAndUpdate = async (id, data) => {
    return bookCopy_originalSchema
      .findByIdAndUpdate(id, data, { new: true })
      .lean();
  };

  static findOneByBookId = async (bookId) => {
    return bookCopy_originalSchema.findOne({ bookParent: bookId }).lean();
  };

  // đếm số đầu sách
  static countDocument = async (query) => {
    return bookCopy_originalSchema.countDocuments(query);
  };
  /**
   *
   * @param {String} bookParentId id của sách
   * @description tính tổng số lượng theo từng trạng thái
   */
  static getQuantityGroupByStatus = async (bookParentId) => {
    const result = await bookCopy_originalSchema.aggregate([
      {
        $match: {
          bookParent: bookParentId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    return result;
  };
}

module.exports = BookCopyRepo;
