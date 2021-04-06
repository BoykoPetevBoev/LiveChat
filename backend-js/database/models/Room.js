const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    messages: [],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Room', RoomSchema);
