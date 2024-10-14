const { BadRequestError } = require("../responseHandle/error.response");
const { lentSlipDetailSchema } = require("../models/lentSlipDetail.model");

class LentSlipDetailService {
  static insert = async (data) => {
    const { lentSlip, bookCopy, note } = data;
    const lentSlipDetail = new lentSlipDetailSchema({
      lentSlip,
      bookCopy,
      note,
    });
    await lentSlipDetail.save();
    return lentSlipDetail;
  };
}
module.exports = LentSlipDetailService;
