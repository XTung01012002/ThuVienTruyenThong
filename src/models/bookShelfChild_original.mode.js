const { model, Schema, Types } = require('mongoose')

// kệ sách
const bookShelfChild_originalSchema = new Schema({
    genre: {
        type: String,
        required: true
    },
    code: {
        type: String,
    },
    bookShelfParent: {
        type: Types.ObjectId,
        ref:'bookShelf_original',
        required: true
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
    bookShelfChild_originalSchema: model('bookShelfChild_original', bookShelfChild_originalSchema)
}