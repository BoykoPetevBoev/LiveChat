const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    admin: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        require: true
    },
    about: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Room', RoomSchema);
