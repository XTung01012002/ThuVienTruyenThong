const { model, Schema, Types } = require('mongoose')

const ministrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = {
    ministrySchema: model('ministry', ministrySchema)
}