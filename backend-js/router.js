const express = require('express');
const router = express.Router();
const { userLogin, userRegister, db } = require('./handlers');

router.get('/', (req, res) => res.send(db));
router.post('/login', (req, res) => userLogin(req, res));
router.post('/register', (req, res) => userRegister(req, res));

module.exports = router;