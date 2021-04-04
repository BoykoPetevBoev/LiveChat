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
    const token = res?.headers?.get('Authorization')
    if (token)
        document.cookie = `Token=${token}`;

    const result = res.ok
        ? await res.json()
        : undefined;

    return result;
}

function errorHandler(err) {
    console.error(err);
}

async function userLogin(body) {
    const response = await fetchRequest('POST', body, `${URL}/login`);
    return response;
}

async function userRegister(body) {
    const response = await fetchRequest('POST', body, `${URL}/register`);
    return response;
}

async function userAuthorization(token) {
    const response = await fetchRequest('GET', undefined, `${URL}/verify?token=${token}`);
    return response;
}

async function findUsers(username) {
    const response = await fetchRequest('GET', undefined, `${URL}/users?username=${username}`);
    return response;
}

async function sendFriendRequest(body) {
    const response = await fetchRequest('POST', body, `${URL}/send-friend-request`);
    return response;
}

async function removeFriendRequest(body) {
    const response = await fetchRequest('POST', body, `${URL}/remove-friend-request`);
    return response;
}

async function acceptFriendRequest(body) {
    const response = await fetchRequest('POST', body, `${URL}/accept-friend-request`);
    return response;
}

async function removeFriend(body) {
    const response = await fetchRequest('POST', body, `${URL}/remove-friend`);
    return response;
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