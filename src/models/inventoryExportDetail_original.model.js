const { model, Schema, Types } = require('mongoose')

// chi tiết phiếu nhập kho
const inventoryExportDetailSchema = new Schema({
    bookOriginal: {
        type: Types.ObjectId,
        ref: 'book_original'
    },
    inventoryExport:{
        type: Types.ObjectId,
        ref: 'inventoryExport_original'
    },
    quantity:{
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = {
    inventoryExportDetailSchema: model('inventoryExportDetail_original', inventoryExportDetailSchema)
}