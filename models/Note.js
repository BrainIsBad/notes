const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true, unique: false},
    text: {type: String, required: true, unique: false},
    image: {type: String, required: false, unique: false},
})

module.exports = model('Note', schema)

