const { model, Schema, Types } = require('mongoose')

const inventoryOriginalSchema = new Schema({
    bookOriginal: {
        type: Types.ObjectId,
        required: true
    },
    // tổng số lượng
    total: {
        type: Number,
        required: true
    },
    // số lượng chưa xếp giá
    quantityNotInShelf: {
        type: Number,
        required: true,
        default: 0
    },
    // số lượng sách trên kệ
    quantityInShelf: {
        type: Number,
        required: true,
        default: 0
    },
    // số lượng sách cho mượn
    quantityLent: {
        type: Number,
        required: true,
        default: 0,
    },
    // số lượng sách đã xuất
    quantityOutput: {
        type: Number,
        required: true,
        default: 0
    },
    school: {
        type: Types.ObjectId,
        ref: 'school',
        index: true
    },
    ministry: {
        type: Types.ObjectId,
        ref: 'ministry',
        index: true
    },
    department: {
        type: Types.ObjectId,
        ref: 'department',
        index: true
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = {
    inventoryOriginalSchema: model('inventoryOriginal', inventoryOriginalSchema)
}