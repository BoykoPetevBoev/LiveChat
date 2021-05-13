const RoomSchema = require('./models/Room');
const MessageSchema = require('./models/Message');

const invalidSelector = (selector) => {
    return !selector || typeof selector !== 'object';
}

async function createMessage(message) {
    if (!message || !message.room || !message.sender || !message.content || !message.time) return undefined;
    try {
        const messageModel = await new MessageSchema(message);
        return await messageModel.save();
    } catch (err) { return errorHandler(err) }
}

async function createRoom(room) {
    if (!room || !room.name || !room.type) return undefined;
    try {
        const roomModel = new RoomSchema(room);
        return await roomModel.save();
    } catch (err) { return errorHandler(err) }
}

async function findRoomById(id) {
    if (!id) return undefined;
    try {
        return await RoomSchema
            .findById(id)
            .populate('members')
            .populate('messages')
            .populate('requests')
    } catch (err) { return errorHandler(err) }
}

async function updateRoom(room) {
    if (!room) return undefined;
    try {
        return await RoomSchema
            .findOneAndUpdate({ _id: room._id }, room, { new: true })
            .populate('members')
            .populate('messages')
            .populate('requests')
    } catch (err) { return errorHandler(err) }
}

async function findRooms(selector) {
    if (invalidSelector(selector)) return undefined;
    try {
        return await RoomSchema
            .find(selector)
            .populate('members')
            .populate('messages')
            .populate('requests')
    } catch (err) { return errorHandler(err) }
}

function errorHandler(err) {
    console.error(err);
    return undefined;
}

module.exports = {
    createRoom,
    createMessage,
    findRoomById,
    updateRoom,
    findRooms
}