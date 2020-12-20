const url = "http://localhost/44310/"

async function fetchRequest(method, body, url) {
    console.log(body)
    const promise = await fetch(url, {
        method: method,
        
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return promise;
}

async function userLogin(body) {
    const promise = await fetchRequest('POST', {email: 'boyko@boev.com', password: '12345'}, `https://localhost:44310/api/People`);
    return await handleResponse(promise);
}

async function userRegister(body) {
    const promise = await fetchRequest('POST', body, `${url}api/People`);
    return await handleResponse(promise);
}

async function handleResponse(promise) {
    console.log(promise);
    return promise;
}

module.exports = {
    userLogin,
    userRegister
}