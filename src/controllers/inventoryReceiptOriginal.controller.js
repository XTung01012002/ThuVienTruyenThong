const { SuccessResponse } = require("../responseHandle/success.response");
const InventoryReceiptOriginalService = require("../services/inventoryReceiptOriginal.service");

class InventoryReceiptOriginalController {
  create = async (req, res, next) => {
    const inventoryReceipt = await InventoryReceiptOriginalService.create(req.body);
    new SuccessResponse({
      message: "Tạo phiếu nhập kho mới thành công",
      data: inventoryReceipt,
    }).send(res);
  };

}
module.exports = new InventoryReceiptOriginalController();
