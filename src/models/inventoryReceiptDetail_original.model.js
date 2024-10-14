const { model, Schema, Types } = require('mongoose')

// chi tiết phiếu nhập kho
const inventoryReceiptDetailSchema = new Schema({
    bookOriginal: {
        type: Types.ObjectId,
        ref: 'book_original'
    },
    inventoryReceipt:{
        type: Types.ObjectId,
        ref: 'inventoryReceipt_original'
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
    inventoryReceiptDetailSchema: model('inventoryReceiptDetail_original', inventoryReceiptDetailSchema)
}