const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }
});

module.exports = mongoose.model("Message", MessageSchema);

