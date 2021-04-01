require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const updateCardDB = require('./scripts/updateCardDB')

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (e) => {console.error(error)})
db.once('open', async () => {
    updateCardDB()
})
app.use(express.json())

const cardsRouter = require('./routes/cards')
app.use('/cards', cardsRouter)

const collectionRouter = require('./routes/collection')
app.use('/collection', collectionRouter)

const decksRouter = require('./routes/decks');
app.use('/decks', decksRouter)

app.get('/', (req, res) => {
    res.send('API online')
})

app.get('/updateCards', async (req, res) => {
    result = await updateCardDB()
    res.json(result)
})


app.listen(port, () => console.log("listening on port: " + port))