const { checkPassword, hashPassword } = require('../database/utils')
const {
    createUser,
    createRoom,
    findUser,
    findUserById,
    findRoomById,
    findUsers,
    updateUser,
    updateRoom,
    findRooms,
} = require('../database/database');

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

async function getGroup(req, res) {
    try {
        const { id } = req.query;
        if (!id) return res.status(401).send('Invalid data').end();

        const chat = await findRoomById(id);
        return res.status(200).send(chat);
    } catch (err) { errorHandler(err, req, res) }
}

async function createGroup(req, res) {
    try {
        const group = req.body;
        if (!group || !group.name || !group.type || !group.members || group.members.length === 0)
            return res.status(401).send('Invalid data').end();

        const savedGroup = await createRoom(group);
        savedGroup.members.map(async (id) => {
            const user = await findUserById(id);
            user.rooms = addId(user.rooms, savedGroup._id);
            return await updateUser(user);
        });
        return res.status(200).send(savedGroup);
    } catch (err) { errorHandler(err, req, res) }
}

async function updatePassword(req, res) {
    try {
        const { user, currPassword, newPassword, rePassword } = req.body;
        if (!user ||
            !currPassword ||
            !newPassword ||
            !rePassword ||
            newPassword === '' ||
            newPassword.length < 3 ||
            newPassword.length > 50 ||
            rePassword !== newPassword
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
        const user = req.body;
        if (!user) return res.status(401).send('Invalid data').end();

        const updatedUser = await updateUser(user);
        return res.status(200).send(updatedUser);
    } catch (err) { errorHandler(err, req, res) }
}

async function updateGroup(req, res) {
    try {
        const room = req.body;
        if (!room) return res.status(401).send('Invalid data').end();

        const updatedRoom = await updateRoom(room);
        updatedRoom.members.map(async (id) => {
            const user = await findUserById(id);
            user.rooms = addId(user.rooms, savedGroup._id);
            return await updateUser(user);
        });
        return res.status(200).send(updatedRoom);
    } catch (err) { errorHandler(err, req, res) }
}

async function getPublicGroups(req, res) {
    try {
        const rooms = await findRooms({ type: 'public' });
        return res.status(200).send(rooms);
    } catch (err) { errorHandler(err, req, res) }
}

async function sendGroupRequest(req, res) {
    try {
        const { senderId, groupId } = req.body;
        if (!senderId || !groupId )
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
    userLogin,
    userRegister,
    userUpdate,
    userAuthorization,
    getUsersByUsername,
    sendFriendRequest,
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend,
    getGroup,
    createGroup,
    updateGroup,
    updatePassword,
    getPublicGroups,
    sendGroupRequest
}