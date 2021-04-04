const axios = require('axios')

const getAllCards = async (model) => {    
    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php').then((response) => {
        response.data.data.forEach((card) => {
            newEntry = {
                name: card.name,
                id: prepareID(card.id),
                image: card.card_images[0].image_url,
                thumbnail: card.card_images[0].image_url_small,
                effect: card.desc,
                type: card.type,
                attribute: card.attribute,
                race: card.race,
                level: card.level,
                atk: card.atk,
                def: card.def
            }
            model.create(newEntry)
        })
    })

}

function prepareID(id) {
    return id.toString().padStart(8, 0)
}

module.exports = getAllCards