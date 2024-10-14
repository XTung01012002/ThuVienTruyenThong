const { model, Schema, Types } = require('mongoose')

// phiếu nhập kho
const inventoryReceiptSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        default: ''
    },
    reason:{
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = {
    inventoryReceiptSchema: model('inventoryReceipt_original', inventoryReceiptSchema)
}