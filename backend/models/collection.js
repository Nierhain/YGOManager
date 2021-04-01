const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    name: String,
    id: Number,
    amount: Number
});

module.exports = mongoose.model('Collection', collectionSchema, 'collection')