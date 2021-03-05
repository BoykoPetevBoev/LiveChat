
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

function promiseHandler(res) {
    if (res.status < 300) return res.json();
    else throw new Error('Something went wrong on api server!');
}

function errorHandler(err) {
    console.error(err);
}

async function userLogin(body) {
    const response = await fetchRequest('POST', body, `${URL}/login`);
    console.log(response);
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