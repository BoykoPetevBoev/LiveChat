const express = require('express');
const router = express.Router();
const db = [];

router.get('/', (req, res) => {
    res.send(db)
})

router.post('/login', (req, res) => {
    const user = req.body;

    const foundUser = db.find(u => u.email === user.email);
    if(!foundUser) res.status(401).end();
    else if(user.password !== foundUser.password) res.status(401).end();
    else res.status(200).send(foundUser);
})

router.post('/register', (req, res) => {
    const user = req.body;
    const foundUser = db.find(u => u.email === user.email);
    if(foundUser) res.status(401).send('This email is already registered!').end();
    else {
        db.push(user);
        res.status(200).send(foundUser);
    }
})

module.exports = router;