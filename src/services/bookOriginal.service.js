const { BadRequestError } = require("../responseHandle/error.response");
const { book_originalSchema } = require("../models/book_original.model");
const xlsx = require("xlsx");
const fs = require("fs");
const BookOriginalRepo = require("../models/repos/bookOriginalRepo.repo");
const { BOOK_CODE_NUM } = require("../configs/bookOriginal.config");

class BookOriginService {
  static getAll = async () => {
    const books = await book_originalSchema.find().lean();
    return books;
  };

  static getById = async (id) => {
    const book = await book_originalSchema.findById(id).lean();
    return book;
  };

  static update = async (id, data) => {
    const { name, genre, author, publisher, yearOfPublication } = data;
    const payload = {
      ...(name && { name: name }),
      ...(price && { price: price }),
      ...(genre && { genre: genre }),
      ...(author && { author: author }),
      ...(publisher && { publisher: publisher }),
      ...(yearOfPublication && { yearOfPublication: yearOfPublication }),
    };
    const book = await book_originalSchema
      .findByIdAndUpdate(id, payload, {
        new: true,
      })
      .lean();
    return book;
  };

  static create = async (data) => {
    const { name, genre, author, publisher, yearOfPublication } = data;
    const query = {
      school: '',
      department: '',
      ministry: ''
    }
    const countBook = await BookOriginalRepo.countDocument(query)
    const code = countBook.toString().padStart(BOOK_CODE_NUM, 0)

    const book = new book_originalSchema({
      name,
      genre,
      author,
      publisher,
      code,
      yearOfPublication,
    });
    await book.save();
    return book;
  };

  static exportExcel = async () => {
    const dataBooks = await book_originalSchema.find().lean();
    const data = dataBooks.map((book) => {
      return {
        "Tên sách": book.name,
        "Thể loại": book.genre,
        "Tác giả": book.author,
        "Nhà xuất bản": book.publisher,
        "Năm xuất bản": book.yearOfPublication,
      };
    });
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workBook, workSheet, "Book"); // Thêm sheet vào workbook
    // Chuyển workbook thành buffer
    const exportExcel = xlsx.write(workBook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return exportExcel;
  };
}
module.exports = BookOriginService;
