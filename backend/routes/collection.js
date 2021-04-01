const express = require('express')
const router = express.Router()
const Collection = require('../models/collection')
const paginateResults = require('../middlewares/paginationMiddleware')

router.get('/', paginateResults(Collection), async (req, res) => {
    res.json(res.paginatedResults)
})

router.get('/:id', getCard, async(req, res) => {
    res.json(res.card)
})

router.post('/', async (req,res) => {
    const card = new Collection({
        name: req.body.name,
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

router.patch('/:id', getCard, async(req, res) => {
    if(req.body.amount != null) {
        res.card.amount = req.body.amount
    }
    try {
        const updatedCard = await res.card.save()
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getCard, async (req, res) => {
    try {
        await res.card.remove()
        res.json({message: 'card removed'})
    } catch(err){
        res.status(500).json({message: err.message})
    }   
})

async function getCard(req, res, next) {
    try {
        card = await Collection.find((element) => {
            element.id == req.params.id
        })
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