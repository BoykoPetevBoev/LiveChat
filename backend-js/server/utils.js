const jwt = require('jsonwebtoken');
const config = require('../config/config');

function setToken(user) {
    const id = user._id;
    const email = user.email;
    const token = jwt.sign({ id, email }, config.tokenKey);
    return token;
}

async function verifyToken(token) {
    try {
        return await jwt.verify(token, config.tokenKey);
    } 
    catch (e) {
        console.error(e);
        return undefined;
    }
}

module.exports = {
    setToken,
    verifyToken
}