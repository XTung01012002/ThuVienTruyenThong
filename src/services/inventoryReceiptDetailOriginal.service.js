const { BadRequestError } = require("../responseHandle/error.response");
const {
  inventoryReceiptDetailSchema,
} = require("../models/inventoryReceiptDetail_original.model");

class InventoryReceiptDetailOriginalService {
  static insert = async (data) => {
    const { bookOriginal, quantity, inventoryReceipt } = data;
    const result = await inventoryReceiptDetailSchema.create({
      bookOriginal,
      quantity,
      inventoryReceipt,
    });
    return result;
  };
}
module.exports = InventoryReceiptDetailOriginalService;
