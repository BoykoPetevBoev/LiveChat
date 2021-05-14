const { checkPassword, hashPassword } = require('../database/utils')
const {
    createRoom,
    createMessage,
    findRoomById,
    updateRoom,
    findRooms
} = require('../database/database-room');

const {
    createUser,
    findUser,
    findUserById,
    findUsers,
    updateUser
} = require('../database/database-user');

const {
    setToken,
    verifyToken,
    addId,
    removeId,
    areTheyFriends } = require('./utils');

async function createGroup(req, res) {
    try {
        const group = req.body;
        if (!group || group._id || !group.name || !group.type || !group.members || group.members.length === 0)
            return res.status(401).send('Invalid data').end();

        const savedGroup = await createRoom(group);
        savedGroup.members.map(async (user) => {
            user = await findUserById(user);
            user.rooms = addId(user.rooms, savedGroup._id);
            return await updateUser(user);
        });
        return res.status(200).send(savedGroup);
    } catch (err) { errorHandler(err, req, res) }
}

async function updateGroup(req, res) {
    try {
        const room = req.body;
        if (!room || !room._id)
            return res.status(401).send('Invalid data').end();

        const updatedRoom = await updateRoom(room);
        updatedRoom.members.map(async (user) => {
            user = await findUserById(user);
            user.rooms = addId(user.rooms, updatedRoom);
            return await updateUser(user);
        });
        return res.status(200).send(updatedRoom);
    } catch (err) { errorHandler(err, req, res) }
}

async function sendGroupRequest(req, res) {
    try {
        const { senderId, groupId } = req.body;
        if (!senderId || !groupId)
            return res.status(401).send('Invalid data').end();

        const group = await findRoomById(groupId);
        group.requests = addId(group.requests, senderId);
        const updatedGroup = await updateRoom(group);
        return res.status(200).send(updatedGroup);
    } catch (err) { errorHandler(err, req, res) }
}

function errorHandler(err, req, res) {
    console.error(err);
    return res.status(500).send({ error: 'Something failed!' });
}

module.exports = {
    createGroup,
    updateGroup,
    sendGroupRequest
}