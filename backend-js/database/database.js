const UserSchema = require('./models/Users');
const { hashPassword, checkPassword } = require('./utils');

const invalidSelector = (selector) => {
    return !selector || typeof selector !== 'object';
}

async function createUser(user) {
    if (!user.username || !user.email || !user.password)
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
        return await UserSchema.findOne(selector).exec();
    } catch (err) { return errorHandler(err) }
}

async function findUserById(id) {
    if (!id) return undefined;
    try {
        return await UserSchema.findById(id)
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
        return await UserSchema.findOneAndUpdate({ _id: user._id }, user)
    } catch (err) { return errorHandler(err) }
}

function findAllUsers() {
    try {
        return []
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
    findAllUsers,
    updateUser,
}