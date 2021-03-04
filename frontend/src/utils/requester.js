const url = "http://localhost/44310/"

async function fetchRequest(method, body, url) {
<<<<<<< HEAD
    
=======
    console.log(body)
>>>>>>> 8528cec0feb26a07903680cfd05c7b8090583044
    const promise = await fetch(url, {
        method: method,
        
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return promise;
}

async function userLogin(body) {
    const promise = await fetchRequest('POST', body, `https://localhost:44310/api/People`);
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