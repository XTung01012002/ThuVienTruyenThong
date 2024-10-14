const { model, Schema, Types } = require("mongoose");

const lentSlipDetailSchema = new Schema(
  {
    lentSlip: {
      type: Types.ObjectId,
      ref: "lentSlip",
    },
    bookCopy: {
      type: Types.ObjectId,
      ref: "bookCopy_original",
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = {
  lentSlipDetailSchema: model("lentSlipDetail", lentSlipDetailSchema),
};
