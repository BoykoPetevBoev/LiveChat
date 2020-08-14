const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    phone: {
        default: null,
        type: Number
    },
    address: {
        type: String,
        default: ''
    },
    shoppingCart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
})

module.exports = mongoose.model('User', UserSchema);
