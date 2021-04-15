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

function addId(array, id) {
    const match = (user) => user._id == id;
    if (!array.some(match)) {
        array.push(id);
    }
    return array;
}

function removeId(array, id) {
    const match = (user) => user._id == id;
    if (array.some(match)) {
        const index = array.findIndex(match);
        array.splice(index, 1);
    }
    return array;
}

function areTheyFriends(userOne, userTwo) {
    const userOneHaveId = userOne.friends.some(user => user._id === userTwo._id);
    const userTwoHaveId = userTwo.friends.some(user => user._id === userOne._id);

    if (userOneHaveId !== userTwoHaveId)
        throw new Error(`Inconsistent information: ${userOne._id} / ${userTwo._id}`)

    return userOneHaveId && userTwoHaveId;
}

module.exports = {
    setToken,
    verifyToken,
    addId,
    removeId,
    areTheyFriends
}