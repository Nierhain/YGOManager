const express = require('express')
const router = express.Router()
const Collection = require('../models/collection')
const Card = require('../models/cards')
const paginateResults = require('../middlewares/paginationMiddleware')

router.get('/', paginateResults(Collection), async (req, res) => {
    res.json(res.paginatedResults)
})

router.get('/:id', async (req, res) => {
    try {
        card = await Collection.findOne({ id: req.params.id }).lean()
        if (card == null) {
            res.json(0)
        } else {
            res.json(card.amount)
        } 
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
})

router.post('/', validateRequestParams, async (req, res) => {
    const card = new Collection({
        name: res.cardName,
        id: req.body.id,
        amount: req.body.amount
    })
    try {
        const newCard = await card.save()
        res.status(201).json(newCard)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.post("/list", async (req, res) => {
    let failedIds = [];
    let addedIds = [];
    if (req.body.data === null || typeof req.body.data === 'undefined') {
        res.status(400).json("something happened")
        return
    }
    for (const card of req.body.data) {
        const queriedCard = await Card.findOne({ "id": card.id }).exec()
        if (queriedCard === null) {
            failedIds.push(card.id)
            continue
        }
        isInCollection = await checkCollection(queriedCard)
        console.log("isInCollection:" + isInCollection)
        if (isInCollection) {
            const newCard = await Collection.findOneAndUpdate({ id: card.id }, { $inc: { 'amount': card.amount } }, { new: true })
        } else {
            const newCard = new Collection({
                name: queriedCard.name,
                id: card.id,
                amount: card.amount,
            });
            try {
                const isSaved = await newCard.save();
                if (isSaved === newCard) {
                    
                }
            } catch (err) {
                res.status(500).json({message: err.message})
            }
        }
        addedIds.push(card.id);
    }

    res.status(200).json({added: addedIds.length, failed: failedIds})
});

router.patch('/:id', getCardInCollection, async(req, res) => {
    if(req.body.amount != null) {
        res.card.amount = req.body.amount
    }
    try {
        const updatedCard = await res.card.save()
        res.json(updatedCard)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getCardInCollection, async (req, res) => {
    try {
        await res.card.remove()
        res.json({message: 'card removed'})
    } catch(err){
        res.status(500).json({message: err.message})
    }   
})

async function checkCollection(card) {
    // console.log("card id: " + card.id)
    if(card === null) return false
    collected = await Collection.findOne({id: card.id})
    // console.log("collected: " + collected)
    return collected !== null
}

async function addCard(card) {
    const newCard = new Collection({
        name: card.name,
        id: card.id,
        amount: card.amount
    })
    newCard.save().exec()
    return true
}

async function validateRequestParams(req, res, next) {
        if (typeof req.body.name === "undefined") {
            try {
                card = await Card.findOne({ id: req.body.id })
                if (card == null) {
                    return res.status(404).json({ message: "Cannot find card" });
                }
            } catch (error) {
            res.status(400).json({ message: error.message });
            }
            res.cardName = card.name
            
        } else {
            res.cardName = req.body.name
        }
    next();
}

async function getCardInCollection(req, res, next) {
    try {
        card = await Collection.findOne({id: req.params.id})
        if(card == null){
            return res.status(404).json({message: 'Cannot find card'})
        }
    } catch (err){
        return res.status(500).json({ message: err.message})
    }

    res.card = card
    next()
}

module.exports = router