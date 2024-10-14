const { model, Schema, Types } = require('mongoose')

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    banner: {
        type: String,
        default: 'default'
    },
    logo: {
        type: String,
        default: 'default'
    },
    accessibleBooks: [Types.ObjectId],
    ministry: {
        type: Types.ObjectId,
        required: true,
        ref: 'ministry',
        index: true
    },
    department: {
        type: Types.ObjectId,
        required: true,
        ref: 'department',
        index: true
    },
    storage: {
        type: Number,
        required: true,
        default: 15 * 1000 * 1000 // KB
    },
    storage_used: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    versionKey: false,
    timestamps: true
})

module.exports = {
    schoolSchema: model('school', schoolSchema)
}