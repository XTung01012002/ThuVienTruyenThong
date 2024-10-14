const { model, Schema, Types } = require("mongoose");

const lentSlipSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    // người mượn
    borrower: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    //người cho mượn
    lender: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    returnDate: {
      type: Date,
    },
    // số lượng quyển sách đã mượn
    totalBorrower: {
      type: Number,
      required: true,
    },
    // 0 - đang mượn, 1- đã trả, -1 - trả muộn
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    note: {
      type: String,
      default: "",
    },
    school: {
      type: Types.ObjectId,
      ref: "school",
    },
    ministry: {
      type: Types.ObjectId,
      ref: "ministry",
    },
    department: {
      type: Types.ObjectId,
      ref: "department",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = {
  lentSlipSchema: model("lentSlip", lentSlipSchema),
};
