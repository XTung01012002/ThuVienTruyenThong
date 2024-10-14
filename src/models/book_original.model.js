const { model, Schema, Types } = require("mongoose");
const slugifyConfig = require("../configs/slugify.config");
const { default: slugify } = require("slugify");


const book_originalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true
    },
    normalizeName: {
      type: String,
    },
    genre: {
      type: Number,
      ref: "genre_original",
    },
    author: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    // Nhà xuất bản
    publisher: {
      type: String,
      default: "",
    },
    yearOfPublication: {
      type: Number,
    },
    school: {
      type: Types.ObjectId,
      ref: "school",
      index: true,
    },
    ministry: {
      type: Types.ObjectId,
      ref: "ministry",
      index: true,
    },
    department: {
      type: Types.ObjectId,
      ref: "department",
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

book_originalSchema.pre("save", function (next) {
  this.slug = slugify(this.name, slugifyConfig);
  this.normalizeName = slugify(this.name, {
    lower: true,
    replacement: " ",
    locale: "vi",
    remove: /[!,:,?,.]/g,
  });
  next();
});

module.exports = {
  book_originalSchema: model("book_original", book_originalSchema),
};
