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
        card = await Collection.findOne({ id: req.params.id })
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
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

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

async function validateRequestParams(req, res, next) {
        console.log(req.body.id)
        if (typeof req.body.name === "undefined") {
            try {
                card = await Card.findOne({ id: req.body.id })
                console.log(card)
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
        card = await Collection.findOne({id: req.body.id})
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