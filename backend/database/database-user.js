const UserSchema = require('./models/Users');
const RoomSchema = require('./models/Room');
const { hashPassword } = require('./utils');
const mongoose = require('mongoose')

const invalidSelector = (selector) => {
    return !selector || typeof selector !== 'object';
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
    findUser,
    findUserById,
    findUsers,
    updateUser
}