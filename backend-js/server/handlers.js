const { createUser, getUser, getAllUsers, findUsers } = require('../database/database');
const { checkPassword } = require('../database/utils')

async function userLogin(req, res) {
    const user = req.body;
    console.log(user);
    if (!user.email || !user.password) {
        return res.status(401).send('Invalid data').end();
    }

    const foundUser = await getUser({ email: user.email });
    if (!foundUser) return res.status(401).end();

    const matchPassword = await checkPassword(user.password, foundUser.password);
    if (!matchPassword) return res.status(401).end();

    console.log(foundUser);
    return res.status(200).send(foundUser);
}

async function userRegister(req, res) {
    const user = req.body;
    if (!user.username || !user.email || !user.password)
        return res.status(401).send('Invalid data').end();

    const foundUser = await getUser({ email: user.email });
    if (foundUser)
        return res.status(401).send('This email is already registered!').end();

    const createdUser = await createUser(user);
    return res.status(200).send(createdUser);
}

async function showUsers() {
    const users = await getAllUsers();
    return users.rows;
}

async function getUsersByUsername(req, res) {
    const { username } = req.query;
    const users = await findUsers({username});
    return res.status(200).send(users);
}

module.exports = {
    userLogin,
    userRegister,
    showUsers,
    getUsersByUsername
}