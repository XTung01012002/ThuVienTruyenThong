const { SuccessResponse } = require("../responseHandle/success.response");
const InventoryExportOriginalService = require("../services/inventoryExportOriginal.service");

class InventoryExportOriginaController {
    create = async (req, res) => {
        new SuccessResponse({
            message: "Tạo này phiếu xuất thành công",
            data: await InventoryExportOriginalService.create(req.body)
        }).send(res);
    }
}

module.exports = new InventoryExportOriginaController();