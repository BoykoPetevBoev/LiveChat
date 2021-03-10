const UserSchema = require('./models/Users');
const { hashPassword, checkPassword } = require('./utils');

async function createUser(user) {
    try {
        user.password = hashPassword(user.password)
        const userModel = new UserSchema(user);
        const savedUser = await userModel.save();
        return savedUser;
    }
    catch (err) { return errorHandler(err) }
}

async function findUser(selector) {
    try {
        return await UserSchema.findOne(selector).exec();
    }
    catch (err) { return errorHandler(err) }
}

async function findUsers(selector) {
    try {
        return UserSchema.find(selector)
    }
    catch (err) { return errorHandler(err) }
}

function findAllUsers() {
    try {
        return []
    }
    catch (err) { return errorHandler(err) }
}

function errorHandler(err) {
    console.error(err);
    return undefined;
}

module.exports = {
    createUser,
    findUser,
    findUsers,
    findAllUsers,
}