const axios = require('axios')
const Card = require('../models/cards')
const Config = require('../models/config')
const getAllCards = require('./getAllCards')

async function shouldUpdate() {
    let query = await axios.get('https://db.ygoprodeck.com/api/v7/checkDBVer.php')
    let queriedVersion = query.data[0].database_version
    let currentVersion = await Config.findOne({"key" : "db_version"}).exec()

    if(currentVersion == null){
        newDoc = {
            "key": "db_version",
            "value": query.data[0].database_version
        }
        Config.create(newDoc)
        return true
    }

    if(notUpToDate(currentVersion.value, queriedVersion)){
        currentVersion.value = queriedVersion
        currentVersion.save()
        return true
    }
}

function notUpToDate(a, b){
    return parseFloat(a) < parseFloat(b)
}

async function updateCardDB(){
    await Card.collection.deleteMany({})
    getAllCards(Card)
}

const triggerUpdate = async (force) => {
    if (force) {
        updateCardDB()
        return "db update forced"
    }
    let updateResult = await shouldUpdate()
    if(updateResult){
        updateCardDB()
        return "db updated"
    } else {
        return "already up to date"
    }
}

module.exports = triggerUpdate