const db = [];

function userLogin(req, res) {
    const user = req.body;
    const foundUser = findUser(user);
    if (!foundUser)
        res.status(401).end();
    else if (user.password !== foundUser.password)
        res.status(401).end();
    else
        res.status(200).send(foundUser);
}

function userRegister(req, res) {
    const user = req.body;
    const foundUser = findUser(user);
    if (foundUser)
        res.status(401).send('This email is already registered!').end();
    else {
        db.push(user);
        res.status(200).send(user);
    }
}

function findUser(user) {
    const foundUser = db.find(u => u.email === user.email);
    console.log(foundUser);
    return foundUser;
}

module.exports = {
    db,
    userLogin,
    userRegister
}