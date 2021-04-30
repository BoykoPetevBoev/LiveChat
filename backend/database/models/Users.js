const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    receivedRequests: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    sentRequests: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
})

module.exports = mongoose.model('User', UserSchema);