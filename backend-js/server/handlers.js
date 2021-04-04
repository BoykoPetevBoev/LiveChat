const { checkPassword } = require('../database/utils')
const {
    createUser,
    findUser,
    findUserById,
    findUsers,
    findAllUsers,
    updateUser } = require('../database/database');

const {
    setToken,
    verifyToken
} = require('./utils');

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
            return res.status(401).send('This email is already registered!').end();

        const createdUser = await createUser(user);
        const token = setToken(foundUser);
        return res.status(200).header('Authorization', token).send(createdUser);
    }
    catch (err) { errorHandler(err, req, res) }
}

async function userAuthorization(req, res) {
    try {
        const { token } = req.query;
        if(!token) return res.status(401).end();

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
        if(!username) return res.status(401).end();

        const users = await findUsers({ username });
        return res.status(200).send(users);
    }
    catch (err) { errorHandler(err, req, res) }
}

async function sendFriendRequest(req, res) {
    try {
        const { user, id } = req.body;
        if (!user || !user._id || !id)
            return res.status(401).send('Invalid data').end();

        let sender = await findUserById(user._id);
        let receiver = await findUserById(id);

        sender.sentRequests = addId(sender.sentRequests, id);
        sender = await updateUser(sender);

        receiver.receivedRequests = addId(receiver.receivedRequests, user._id);
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

        sender.sentRequests = removeId(sender.sentRequests, user._id);
        sender.receivedRequests = removeId(sender.receivedRequests, user._id);
        sender.friends = addId(sender.friends, user._id);
        sender = await updateUser(sender);

        receiver.sentRequests = removeId(receiver.sentRequests, id);
        receiver.receivedRequests = removeId(receiver.receivedRequests, id);
        receiver.friends = addId(receiver.friends, id);
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

function addId(array, id) {
    const match = (user) => user._id == id;
    if (!array.some(match))
        array.push(id);

    return array;
}

function removeId(array, id) {
    const match = (user) => user._id == id
    if (array.some(match)) {
        const index = array.findIndex(match);
        array.splice(index, 1);
    }
    return array;
}

function errorHandler(err, req, res) {
    console.error(err);
    return res.status(500).send({ error: 'Something failed!' });
}

module.exports = {
    userLogin,
    userRegister,
    userAuthorization,
    getUsersByUsername,
    sendFriendRequest,
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend
}