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
    tokenHandler(res);

    const result = res.ok
        ? await res.json()
        : undefined;

    return result;
}

function errorHandler(err) {
    console.error(err);
    return undefined;
}

function tokenHandler(res) {
    const token = res?.headers?.get('Authorization');
    if (token)
        localStorage.setItem('token', token);
}

async function userAuthorization(token) {
    if (!token) return;
    return await fetchRequest('GET', undefined, `${URL}/verify?token=${token}`);
}

async function findUsers(username) {
    if (!username) return;
    return await fetchRequest('GET', undefined, `${URL}/users?username=${username}`);
}

async function getChat(id) {
    if (!id) return;
    return await fetchRequest('GET', undefined, `${URL}/chat?id=${id}`)
}

async function userLogin(body) {
    if (!body) return;
    return await fetchRequest('POST', body, `${URL}/login`);
}

async function userRegister(body) {
    if (!body) return;
    return await fetchRequest('POST', body, `${URL}/register`);
}

async function sendFriendRequest(body) {
    if (!body) return;
    return await fetchRequest('POST', body, `${URL}/send-friend-request`);
}

async function removeFriendRequest(body) {
    if (!body) return;
    return await fetchRequest('POST', body, `${URL}/remove-friend-request`);
}

async function acceptFriendRequest(body) {
    if (!body) return;
    return await fetchRequest('POST', body, `${URL}/accept-friend-request`);
}

async function removeFriend(body) {
    if (!body) return;
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
    removeFriend,
    getChat
}