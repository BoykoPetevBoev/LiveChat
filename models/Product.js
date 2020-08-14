const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {
        required: true,
        type: String
    },
    brand: {
        required: true,
        type: String
    },
    model: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    images: [{
        required: true,
        type: String
    }],
    description: {
        required: true,
        type: String
    },
    characteristics: [{
        required: true,
        type: Array
    }]
});

module.exports = mongoose.model('Product', ProductSchema)