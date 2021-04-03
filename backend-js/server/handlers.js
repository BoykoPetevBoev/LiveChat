const { checkPassword } = require('../database/utils')
const {
    createUser,
    findUser,
    findUserById,
    findUsers,
    findAllUsers,
    updateUser } = require('../database/database');

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
        return res.status(200).send("Hello World!");
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

async function sendFriendRequest(req, res) {
    try {
        const { user, id } = req.body;
        console.log(id, user);
        let sender = await findUserById(user._id);
        let receiver = await findUserById(id);

        if (!sender.sentRequests.some(u => u._id === id)) {
            sender.sentRequests.push(id);
            sender = await updateUser(sender);
        }

        if (!receiver.receivedRequests.some(u => u._id === user._id)) {
            receiver.receivedRequests.push(user._id);
            receiver = await updateUser(receiver);
        }
        return res.status(200).send(sender);
    } catch (err) { errorHandler(err, req, res) }
}

async function removeFriendRequest(req, res) {
    try {
        const { user, id } = req.body;
        let receiver = await findUserById(user._id);
        let sender = await findUserById(id);

        if (sender.sentRequests.some(u => u._id == user._id)) {
            const index = sender.sentRequests.findIndex(element => element._id == user._id);
            sender.sentRequests.splice(index, 1);
            sender = await updateUser(sender);
        }

        if (sender.receivedRequests.some(u => u._id == user._id)) {
            const index = sender.receivedRequests.findIndex(element => element._id == user._id);
            sender.receivedRequests.splice(index, 1);
            sender = await updateUser(sender);
        }
        
        if (receiver.sentRequests.some(u => u._id == id)) {
            const index = receiver.sentRequests.findIndex(element => element._id == id);
            receiver.sentRequests.splice(index, 1);
            receiver = await updateUser(receiver);
        }

        if (receiver.receivedRequests.some(u => u._id == id)) {
            const index = receiver.receivedRequests.findIndex(element => element._id == id);
            receiver.receivedRequests.splice(index, 1);
            receiver = await updateUser(receiver);
        }


        return res.status(200).send(receiver);
    } catch (err) { errorHandler(err, req, res) }
}

function errorHandler(err, req, res) {
    console.error(err);
    return res.status(500).send({ error: 'Something failed!' });
}

module.exports = {
    userLogin,
    userRegister,
    showUsers,
    getUsersByUsername,
    sendFriendRequest,
    removeFriendRequest
}