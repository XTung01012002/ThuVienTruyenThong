const { model, Schema, Types } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    password: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: [0, 1],
        default: 1
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'school', 'admin', 'ministry', 'department']
    },
    grade: {
        type: Types.ObjectId,
        ref: 'grade',
        index: true
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
    },
}, {
    versionKey: false,
    timestamps: true
})
module.exports = {
    userSchema: model('user', userSchema)
}