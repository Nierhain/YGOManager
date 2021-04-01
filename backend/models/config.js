const mongoose = require('mongoose')

const configSchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    value: {
        type: String,
        unique: false
    }
})

module.exports = mongoose.model('ConfigOption', configSchema, 'config')