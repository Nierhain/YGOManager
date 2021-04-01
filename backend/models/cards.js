const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name: String,
    id: String,
    image: String,
    thumbnail: String,
    effect: String,
    type: String,
    attribute: String,
    race: String,
    level: Number,
    atk: Number,
    def: Number,
});

module.exports = mongoose.model('Card', cardSchema)