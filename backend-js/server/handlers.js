const { createUser, getUser, getAllUsers } = require('../database/database');

async function userLogin(req, res) {
    const user = req.body;
    if(!user.username || !user.email || !user.password){
        return res.status(401).send('Invalid data').end();
    }

    const foundUser = await getUser({ email: user.email });
    if (!foundUser)
        res.status(401).end();
    else if (user.password !== foundUser.password)
        res.status(401).end();
    else
        res.status(200).send(foundUser);
}

async function userRegister(req, res) {
    const user = req.body;
    const foundUser = await getUser({ email: user.email });
    if (foundUser)
        return res.status(401).send('This email is already registered!').end();
    else {
        createUser(user);
        res.status(200).send(user);
    }
}

async function showUsers(){
    const users = await getAllUsers();
    return users.rows;
}

module.exports = {
    userLogin,
    userRegister,
    showUsers
}