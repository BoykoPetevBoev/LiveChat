const {
    findRoomById,
    findRooms
} = require('../database/database-room');

const {
    findUserById,
    findUsers,
} = require('../database/database-user');

const {
    verifyToken,
} = require('./utils');

async function userAuthorization(req, res) {
    try {
        const { token } = req.query;
        if (!token) return res.status(401).end();

        const tokenStatus = await verifyToken(token);
        if (!tokenStatus) return res.status(401).end();

        const user = await findUserById(tokenStatus.id);
        return res.status(200).header('Authorization', token).send(user);
    }
    catch (err) { errorHandler(err, req, res) }
}

async function getUsersByUsername(req, res) {
    try {
        const { username } = req.query;
        if (!username) return res.status(401).end();

        const users = await findUsers({ username });
        return res.status(200).send(users);
    }
    catch (err) { errorHandler(err, req, res) }
}

async function getGroup(req, res) {
    try {
        const { id } = req.query;
        if (!id) return res.status(401).send('Invalid data').end();

        const chat = await findRoomById(id);
        return res.status(200).send(chat);
    } catch (err) { errorHandler(err, req, res) }
}

async function getPublicGroups(req, res) {
    try {
        const rooms = await findRooms({ type: 'public' });
        return res.status(200).send(rooms);
    } catch (err) { errorHandler(err, req, res) }
}

function errorHandler(err, req, res) {
    console.error(err);
    return res.status(500).send({ error: 'Something failed!' });
}

module.exports = {
    userAuthorization,
    getUsersByUsername,
    getGroup,
    getPublicGroups,
}