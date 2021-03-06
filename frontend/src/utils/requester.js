
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

module.exports = {
    userLogin,
    userRegister
}