const genreOriginalSchema = new Schema({
    _id:{
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false
})
module.exports = {
    genreOriginalSchema: model('genre_original', genreOriginalSchema)
}