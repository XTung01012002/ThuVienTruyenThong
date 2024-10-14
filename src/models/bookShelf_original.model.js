const { model, Schema, Types } = require('mongoose')

// giá sách
const bookShelf_originalSchema = new Schema({
    genre: {
        type: String,
        required: true
    },
    code: {
        type: String,
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
    bookShelf_originalSchema: model('bookShelf_original', bookShelf_originalSchema)
}