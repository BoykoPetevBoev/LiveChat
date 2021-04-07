const UserSchema = require('./models/Users');
const RoomSchema = require('./models/Room');
const { hashPassword, checkPassword } = require('./utils');

const invalidSelector = (selector) => {
    return !selector || typeof selector !== 'object';
}

async function createRoom(room) {
    if (!room || !room.name || !room.type)
        return undefined;
    try {
        const roomModel = new RoomSchema(room);
        const savedRoom = await roomModel.save();
        return savedRoom;
    } catch (err) { return errorHandler(err) }
}

async function createUser(user) {
    if (!user || !user.username || !user.email || !user.password)
        return undefined;
    try {
        user.password = hashPassword(user.password)
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

async function findChatById(id) {
    if(!id) return undefined;
    try {
        return await RoomSchema
            .findById(id)
            .populate('members')
    } catch (err) { return errorHandler(err) }
}

async function findUsers(selector) {
    if (invalidSelector(selector))
        return undefined;
    try {
        return UserSchema.find(selector)
    } catch (err) { return errorHandler(err) }
}

async function updateUser(user) {
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
    findUser,
    findUserById,
    findChatById,
    findUsers,
    updateUser,
}