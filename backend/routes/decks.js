const express = require('express')
const router = express.Router()
const Deck = require('../models/deck')

router.get('/', async (req, res) => {
    try {
        const decks = await Deck.find({})
        res.json(decks)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getDeck, (req, res) => {
    res.json(res.deck)
})

router.post('/', async (req,res) => {
    const deck = new Deck({
        name: req.body.name,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        cards: req.body.cards
    })
    try {
        const newDeck = await deck.save()
        res.status(201).json(newDeck)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id', getDeck, (req, res) => {

})

router.delete('/:id', getDeck, (req, res) => {

})

async function getDeck(req, res, next) {
    try {
        deck = await Deck.find((element) => {
            element.id == req.params.id
        })
        if(Deck == null){
            return res.status(404).json({message: 'Cannot find deck'})
        }
    } catch (err){
        return res.status(500).json({ message: err.message})
    }

    res.deck = deck
    next()
}

module.exports = router