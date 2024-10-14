const { model, Schema, Types } = require('mongoose')

// phiếu nhập kho
const inventoryExportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        default: ''
    },
    reason: {
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: ''
    },
    // 1 là phiếu xuất hủy, 0 là phiếu xuất mất
    type: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = {
    inventoryExportSchema: model('inventoryExport_original', inventoryExportSchema)
}