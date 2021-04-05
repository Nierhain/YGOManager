import axios from 'axios'

const basePath = 'http://localhost:1337/'
const cardsPath = basePath + 'cards'
const collectionPath = basePath + 'collection'
const decksPath = basePath + 'decks'

const getCards = async (page: number, limit: number) => {
    const { data } = await axios.get(cardsPath + '?page=' + page + '&limit=' + limit)
    return data
}

const getCard = async (id: string) => {
    let result = await axios.get(cardsPath + id)
    return result.data
}

const getCollection = async () => {
    let result = await axios.get(collectionPath)
    return result.data
}

const getDecks = async () => {
    let result = await axios.get(decksPath)
    return result.data
}

const getDeck = async (name: string) => {
    let result = await axios.get(decksPath + name)
    return result.data
}

const addCardToCollection = async (id: string, amount: number, name ?: string) => {
    return axios.post(collectionPath, { "name": name, "id": id, "amount": amount })
}

const updateCardinCollection = async (id: string, amount: number) => {
    return axios.patch(collectionPath + id, { id: id, amount: amount})
}

const addDeck = async (name: string, cards: Array<Object>, description?: string, thumbnail?: string) => {
    let postData = {
        "name": name,
        "description": description,
        "thumbnail": thumbnail,
        "cards" : cards
    }

    return axios.post(decksPath, postData)
}

const updateDeck = async (id: string, deck: object) => {
    return axios.patch(decksPath + id, deck)
}

export {getCards, getCard, getCollection, getDeck, getDecks, addCardToCollection, addDeck, updateCardinCollection, updateDeck}