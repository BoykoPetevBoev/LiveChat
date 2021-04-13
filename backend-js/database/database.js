const UserSchema = require('./models/Users');
const RoomSchema = require('./models/Room');
const MessageSchema = require('./models/Message');
const { hashPassword } = require('./utils');

const invalidSelector = (selector) => {
    return !selector || typeof selector !== 'object';
}

// MESSAGE

async function createMessage(message) {
    if (!message.room || !message.sender || !message.content || !message.time)
        return undefined;
    try {
        const messageModel = await new MessageSchema(message);
        const savedMessage = await messageModel.save();
        return savedMessage;
    } catch (err) { return errorHandler(err) }
}

//CHAT

async function createRoom(room) {
    if (!room || !room.name || !room.type)
        return undefined;
    try {
        const roomModel = new RoomSchema(room);
        const savedRoom = await roomModel.save();
        return savedRoom;
    } catch (err) { return errorHandler(err) }
}

async function findChatById(id) {
    if (!id) return undefined;
    try {
        return await RoomSchema
            .findById(id)
            .populate('members')
            .populate('messages')
    } catch (err) { return errorHandler(err) }
}

async function updateChat(room) {
    if (!room) return undefined;
    try {
        return await RoomSchema
            .findOneAndUpdate({ _id: room._id }, room, { new: true })
            .populate('members')
            .populate('messages')
    } catch (err) { return errorHandler(err) }
}

//USER

async function createUser(user) {
    if (!user || !user.username || !user.email || !user.password)
        return undefined;
    try {
        user.password = hashPassword(user.password);
        const userModel = new UserSchema(user);
        const savedUser = await userModel.save();
        return savedUser;
    } catch (err) { return errorHandler(err) }
}

async function findUser(selector) {
    if (invalidSelector(selector))
        return undefined;
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
    if (invalidSelector(selector))
        return undefined;
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
    findChatById,
    findUsers,
    updateUser,
    updateChat
}