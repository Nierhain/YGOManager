const mongoose = require('mongoose')

/*
 * decktype: the deck the card is actually in
 * 0 : main deck
 * 1 : extra deck
 * 2 : side deck
 */
const deckSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    description: String,
    thumbnail: String,
    cards: [{
        name: String,
        id: String,
        deckType: Number,
        amount: Number
    }]
})

module.exports = mongoose.model('Deck', deckSchema)