const { checkPassword } = require('../database/utils')
const {
    createUser,
    findUser,
    findAllUsers,
    findUsers } = require('../database/database');

async function userLogin(req, res) {
    try {
        const user = req.body;
        if (!user.email || !user.password)
            return res.status(401).send('Invalid data').end();

        const foundUser = await findUser({ email: user.email });
        if (!foundUser)
            return res.status(401).end();

        const matchPassword = await checkPassword(user.password, foundUser.password);
        if (!matchPassword)
            return res.status(401).end();

        return res.status(200).send(foundUser);
    }
    catch (err) { errorHandler(err, req, res) }
}

async function userRegister(req, res) {
    try {
        const user = req.body;
        if (!user.username || !user.email || !user.password)
            return res.status(401).send('Invalid data').end();

        const foundUser = await findUser({ email: user.email });
        if (foundUser)
            return res.status(401).send('This email is already registered!').end();

        const createdUser = await createUser(user);
        return res.status(200).send(createdUser);
    }
    catch (err) { errorHandler(err, req, res) }
}

async function showUsers(req, res) {
    try {
        const users = await findAllUsers();
        return users.rows;
    }
    catch (err) { errorHandler(err, req, res) }
}

async function getUsersByUsername(req, res) {
    try {
        const { username } = req.query;
        const users = await findUsers({ username });
        return res.status(200).send(users);
    }
    catch (err) { errorHandler(err, req, res) }
}

function errorHandler(err, req, res) {
    console.error(err);
    return res.status(500).send({ error: 'Something failed!' });
}

module.exports = {
    userLogin,
    userRegister,
    showUsers,
    getUsersByUsername
}