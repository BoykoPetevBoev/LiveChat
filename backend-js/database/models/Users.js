const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
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
    image: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema);