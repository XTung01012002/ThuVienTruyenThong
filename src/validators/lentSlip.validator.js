const Joi = require("joi");

const createValidator = Joi.object({
  borrower: Joi.string().required().messages({
    "any.required": "Người mượn là bắt buộc",
  }),
  lender: Joi.string().required().messages({
    "any.required": "Người cho mượn là bắt buộc",
  }),
  note: Joi.string().allow("").optional(),
  status: Joi.number().allow("").optional(),
  details: Joi.array()
    .min(1)
    .required()
    .messages({
      "array.min": "Chi tiết sách phải có ít nhất 1 cuốn sách",
      "any.required": "Chi tiết sách là bắt buộc",
    })
    .items(
      Joi.object({
        bookCopy: Joi.string().required().messages({
          "any.required": "Sách là bắt buộc",
        }),
        note: Joi.string().allow("").optional(),
      })
    )
    .unique((a, b) => a.bookCopy === b.bookCopy)
    .messages({
      "array.unique": "Id sách trong phiếu mượn không được trùng nhau",
    }),
}).unknown(true);

module.exports = {
  createValidator,
};
