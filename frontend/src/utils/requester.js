const URL = "http://localhost:5000"

function fetchRequest(method, body, url) {
    const params = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify(body)
    }
    return fetch(url, params)
        .then(res => promiseHandler(res))
        .catch(err => errorHandler(err));
}

async function promiseHandler(res) {
    const token = res?.headers?.get('Authorization');
    if (token) localStorage.setItem('token', token);

    const result = res.ok
        ? await res.json()
        : undefined;

    return result;
}

function errorHandler(err) {
    console.error(err);
    return undefined;
}
async function userAuthorization(token) {
    return await fetchRequest('GET', undefined, `${URL}/verify?token=${token}`);
}

async function findUsers(username) {
    return await fetchRequest('GET', undefined, `${URL}/users?username=${username}`);
}

async function userLogin(body) {
    return await fetchRequest('POST', body, `${URL}/login`);
}

async function userRegister(body) {
    return await fetchRequest('POST', body, `${URL}/register`);
}

async function sendFriendRequest(body) {
    return await fetchRequest('POST', body, `${URL}/send-friend-request`);
}

async function removeFriendRequest(body) {
    return await fetchRequest('POST', body, `${URL}/remove-friend-request`);
}

async function acceptFriendRequest(body) {
    return await fetchRequest('POST', body, `${URL}/accept-friend-request`);
}

async function removeFriend(body) {
    return await fetchRequest('POST', body, `${URL}/remove-friend`);
}

module.exports = {
    userLogin,
    userRegister,
    userAuthorization,
    findUsers,
    sendFriendRequest,
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend
}