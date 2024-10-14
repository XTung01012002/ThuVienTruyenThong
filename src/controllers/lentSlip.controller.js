const { SuccessResponse} = require("../responseHandle/success.response");
const LentSlipService = require("../services/lentSlip.service");

class LentSlipController {
    create = async (req, res) => {
        const lentSlip = await LentSlipService.create(req.body);
        new SuccessResponse({
            message: "Tạo phiếu mượn thành công!",
            data: lentSlip
        }).send(res)
    }
    returnBook = async (req, res) => {
        const lentSlip = await LentSlipService.returnBook(req.params.id);
        new SuccessResponse({
            message: "Trả sách thành công!",
            data: lentSlip
        }).send(res)
    }
}
module.exports = new LentSlipController();