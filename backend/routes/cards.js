const express = require('express')
const router = express.Router()
const Card = require('../models/cards')
const paginateResults = require('../middlewares/paginationMiddleware')

router.get('/', paginateResults(Card), async (req, res) => {
    res.json({page: res.page, limit: res.limit, totalItems: res.totalItems, cards: res.paginatedResults, })
})

router.get('/:id', async (req, res) => {
    try {
        const card = await Card.findOne({id: req.params.id})
        if(card == null){
        return res.status(404).json("Cannot find card")
       }
        res.json(card)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router