const UserSchema = require('./models/Users');
const RoomSchema = require('./models/Room');
const MessageSchema = require('./models/Message');
const { hashPassword } = require('./utils');

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
    if (!room || !room.name || !room.type || !room.admin) return undefined;
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
    } catch (err) { return errorHandler(err) }
}

async function updateRoom(room) {
    if (!room) return undefined;
    try {
        return await RoomSchema
            .findOneAndUpdate({ _id: room._id }, room, { new: true })
            .populate('members')
            .populate('messages')
    } catch (err) { return errorHandler(err) }
}

async function findRooms(selector) {
    if (invalidSelector(selector)) return undefined;
    try {
        return await RoomSchema
            .find(selector)
            .populate('members')
            .populate('messages')
    } catch (err) { return errorHandler(err) }
}

async function createUser(user) {
    if (!user || !user.username || !user.email || !user.password) return undefined;
    try {
        user.password = hashPassword(user.password);
        const userModel = new UserSchema(user);
        const savedUser = await userModel.save();
        return savedUser;
    } catch (err) { return errorHandler(err) }
}

async function findUser(selector) {
    if (invalidSelector(selector)) return undefined;
    try {
        return await UserSchema
            .findOne(selector)
            .populate('sentRequests')
            .populate('receivedRequests')
            .populate('friends')
            .populate('rooms')
    } catch (err) { return errorHandler(err) }
}

async function findUserById(id) {
    if (!id) return undefined;
    try {
        return await UserSchema
            .findById(id)
            .populate('sentRequests')
            .populate('receivedRequests')
            .populate('friends')
            .populate('rooms')
    } catch (err) { return errorHandler(err) }
}

async function findUsers(selector) {
    if (invalidSelector(selector)) return undefined;
    try {
        return UserSchema
            .find(selector)
            .populate('sentRequests')
            .populate('receivedRequests')
            .populate('friends')
            .populate('rooms')
    } catch (err) { return errorHandler(err) }
}

async function updateUser(user) {
    if (!user) return undefined;
    try {
        return await UserSchema
            .findOneAndUpdate({ _id: user._id }, user, { new: true })
            .populate('sentRequests')
            .populate('receivedRequests')
            .populate('friends')
            .populate('rooms')
    } catch (err) { return errorHandler(err) }
}

function errorHandler(err) {
    console.error(err);
    return undefined;
}

module.exports = {
    createUser,
    createRoom,
    createMessage,
    findUser,
    findUserById,
    findChatById: findRoomById,
    findUsers,
    updateUser,
    updateRoom,
    findRooms
}