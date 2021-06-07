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

async function userLogin(req, res) {
    try {
        const user = req.body;
        if (!user || !user.email || !user.password)
            return res.status(401).send('Invalid data').end();

        const foundUser = await findUser({ email: user.email });
        if (!foundUser)
            return res.status(401).end();

        const matchPassword = await checkPassword(user.password, foundUser.password);
        if (!matchPassword)
            return res.status(401).end();

        const token = setToken(foundUser);
        return res.status(200).header('Authorization', token).send(foundUser);
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
            return res.status(401).end();

        const createdUser = await createUser(user);
        const token = setToken(createdUser);
        return res.status(200).header('Authorization', token).send(createdUser);
    }
    catch (err) { errorHandler(err, req, res) }
}

async function sendFriendRequest(req, res) {
    try {
        const { user, id } = req.body;
        if (!user || !user._id || !id || user._id === id)
            return res.status(401).send('Invalid data').end();

        let sender = await findUserById(user._id);
        let receiver = await findUserById(id);

        if (areTheyFriends(sender, receiver))
            return res.status(401).send('They are already friends').end();

        sender.sentRequests = addId(sender.sentRequests, receiver._id);
        sender = await updateUser(sender);

        receiver.receivedRequests = addId(receiver.receivedRequests, sender._id);
        receiver = await updateUser(receiver);

        return res.status(200).send(sender);
    } catch (err) { errorHandler(err, req, res) }
}

async function removeFriendRequest(req, res) {
    try {
        const { user, id } = req.body;
        if (!user || !user._id || !id)
            return res.status(401).send('Invalid data').end();

        let receiver = await findUserById(user._id);
        let sender = await findUserById(id);

        sender.sentRequests = removeId(sender.sentRequests, user._id);
        sender.receivedRequests = removeId(sender.receivedRequests, user._id);
        sender = await updateUser(sender);

        receiver.sentRequests = removeId(receiver.sentRequests, id);
        receiver.receivedRequests = removeId(receiver.receivedRequests, id);
        receiver = await updateUser(receiver);

        return res.status(200).send(receiver);
    } catch (err) { errorHandler(err, req, res) }
}

async function acceptFriendRequest(req, res) {
    try {
        const { user, id } = req.body;
        if (!user || !user._id || !id)
            return res.status(401).send('Invalid data').end();

        let receiver = await findUserById(user._id);
        let sender = await findUserById(id);

        const room = {
            type: "chat",
            name: `${receiver.username}/${sender.username}`,
            members: [receiver._id, sender._id]
        }
        const createdRoom = await createRoom(room);

        sender.sentRequests = removeId(sender.sentRequests, user._id);
        sender.receivedRequests = removeId(sender.receivedRequests, user._id);
        receiver.sentRequests = removeId(receiver.sentRequests, id);
        receiver.receivedRequests = removeId(receiver.receivedRequests, id);

        sender.friends = addId(sender.friends, user._id);
        receiver.friends = addId(receiver.friends, id);
        sender.rooms.push(createdRoom._id);
        receiver.rooms.push(createdRoom._id);

        sender = await updateUser(sender);
        receiver = await updateUser(receiver);

        return res.status(200).send(receiver);
    } catch (err) { errorHandler(err, req, res) }
}

async function removeFriend(req, res) {
    try {
        const { user, id } = req.body;
        if (!user || !user._id || !id)
            return res.status(401).send('Invalid data').end();

        let receiver = await findUserById(user._id);
        let sender = await findUserById(id);
        sender.friends = removeId(sender.friends, user._id);
        sender = await updateUser(sender);
        receiver.friends = removeId(receiver.friends, id);
        receiver = await updateUser(receiver);

        return res.status(200).send(receiver);
    } catch (err) { errorHandler(err, req, res) }
}

async function updatePassword(req, res) {
    try {
        const { user, currPassword, newPassword } = req.body;
        if (!user ||
            !currPassword ||
            !newPassword ||
            newPassword === '' ||
            newPassword.length < 3 ||
            newPassword.length > 50
        ) return res.status(401).send('Invalid data').end();

        const matchPassword = await checkPassword(currPassword, user.password);
        if (!matchPassword)
            return res.status(401).end();

        user.password = hashPassword(newPassword);
        const updatedUser = await updateUser(user);
        return res.status(200).send(updatedUser);

    } catch (err) { errorHandler(err, req, res) }
}

async function userUpdate(req, res) {
    try {
        const user = req.body && req.body._doc
            ? req.body._doc
            : req.body;

        if (!user) return res.status(401).send('Invalid data').end();

        // user.rooms = [...new Set(user.rooms
        //     .map(u => u._id)
        //     .map(id => user.rooms.find(r => r._id == id)
        //     ))]
        user.rooms = [...new Set(user.rooms)]

        const updatedUser = await updateUser(user);
        return res.status(200).send(updatedUser);
    } catch (err) { errorHandler(err, req, res) }
}

function errorHandler(err, req, res) {
    console.error(err);
    return res.status(500).send({ error: 'Something failed!' });
}

module.exports = {
    userLogin,
    userRegister,
    sendFriendRequest,
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend,
    updatePassword,
    userUpdate
}