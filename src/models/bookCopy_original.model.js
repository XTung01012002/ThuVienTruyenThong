const { model, Schema, Types } = require('mongoose')

// Quản lý mã cá biệt
const bookCopy_originalSchema = new Schema({
    idCopyCode: {
        type: String,
        required: true
    },
    bookParent: {
        type: Types.ObjectId,
        ref: 'book_original',
        required: true
    },
    bookShelf: {
        type: Types.ObjectId,
        ref: 'bookShelf_original'
    },
    bookShelfChild: {
        type: Types.ObjectId,
        ref: 'bookShelfChild_original'
    },
    // 0 là chưa xếp giá, 1 là xếp giá, 2 là cho mượn, -1 là xuất mất
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, -1]
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
    bookCopy_originalSchema: model('bookCopy_original', bookCopy_originalSchema)
}