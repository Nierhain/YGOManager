const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    name: String,
    id: String,
    amount: Number
});

module.exports = mongoose.model('Collection', collectionSchema, 'collection')