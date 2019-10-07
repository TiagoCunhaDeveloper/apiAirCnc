const moongose = require('mongoose');

const SpotSchema = new moongose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type:moongose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function () {
    return `http://192.168.15.7:3333/files/${this.thumbnail}`
});

module.exports = moongose.model('Spot', SpotSchema);