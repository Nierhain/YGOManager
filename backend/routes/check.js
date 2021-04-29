const express = require("express");
const collection = require("../models/collection");
const router = express.Router();
const Collection = require('../models/collection')

router.post('/', async (req, res) => {
    let cardsNeeded = [];
    let isBuildable = true;

    collectionDB = await Collection.find({}).exec();
    req.body.cards.forEach(card => {
        inCollection = collectionDB.find((element) => { return element.id === card.id })
        let amountNeeded = getAmountNeeded(inCollection.amount, card.amount)
        if (amountNeeded > 0) {
            isBuildable = false;
            cardsNeeded.push({id: card.id, amount: amountNeeded})
        }
    })

    res.json({buildable: isBuildable, cards: cardsNeeded}).status(200);
})

function getAmountNeeded(inCollection, needed) {
    return Math.max(needed - inCollection, 0);
}


module.exports = router;
