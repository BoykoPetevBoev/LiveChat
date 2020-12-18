const axios = require('axios');
const url = "http://localhost/44310"




// async function httpRequest(method, body, url) {

//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url, true);
//     xhr.setRequestHeader("Content-Type", "application/json");

//     // xhr.onreadystatechange = function () { 
//     //     if (xhr.readyState === 4 && xhr.status === 200) { 
//     //         result.innerHTML = this.responseText; 
//     //     } 
//     // }; 

//     const data = JSON.stringify(body);
//     xhr.send(data);
// }

// async function axiosRequest(method, body, url) {
//     const response = await axios({
//         method: method,
//         url: url,
//         headers: { 'X-Requested-With': 'XMLHttpRequest' },
//         responseType: 'json',
//         data: JSON.stringify(body)
//     });
//     console.log(response);
// }

async function fetchRequest(method, body, url) {
    const promise = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return promise;
}

async function userLogin(body) {
    console.log(body);
    const promise = await fetchRequest('POST', {email: 'boyko@boev.com', password: '12345'}, `https://localhost:44310/api/People`);
    return await handleUserRequest(promise);
}

async function userRegister(body) {
    const promise = await fetchRequest('POST', body, `${url}/register`);
    return await handleUserRequest(promise);
}

async function handleUserRequest(promise) {
    console.log(promise);
    return promise;
}

module.exports = {
    userLogin,
    userRegister
}