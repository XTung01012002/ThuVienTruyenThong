const { lentSlipDetailSchema } = require("../lentSlipDetail.model");

class LentSlipDetailRepo {
  static findById = async (id) => {
    return await lentSlipDetailSchema.find({ lentSlip: id }).lean();
  };
}

module.exports = LentSlipDetailRepo;
