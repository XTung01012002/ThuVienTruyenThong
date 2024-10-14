const { model, Schema, Types } = require('mongoose')

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    ministry: {
        type: Types.ObjectId,
        required: true,
        index: true
    },
}, {
    versionKey: false,
    timestamps: true
})

module.exports = {
    departmentSchema: model('department', departmentSchema)
}