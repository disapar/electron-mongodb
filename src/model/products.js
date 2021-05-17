const {model, Schema} = require('mongoose');


const ProductSchema = new Schema({

    title: String,
    price: String,
    description: String,

})

module.exports = model('products', ProductSchema);