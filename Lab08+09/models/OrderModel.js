const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    idOrder:{
        type: String,
        unique: true
    },  
    totalprice: Number,
    listProduct: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

module.exports = mongoose.model('Order',OrderSchema)