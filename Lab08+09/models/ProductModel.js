const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    idProduct:{
        type: String,
        unique: true
    },
    name: String,
    price: Number,
    description: String
})

module.exports = mongoose.model('Product',ProductSchema)