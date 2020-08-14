const jwt = require('jsonwebtoken');
const privateKey = require('../config/config')['tokenKey']

async function setToken(user) {
    const id = user._id;
    const email = user.email;
    const token = await jwt.sign({ id, email }, privateKey);
    return token;
}

async function verifyToken(token) {
        const status = jwt.verify(token, privateKey);
        return status;
}


// function userAutorization(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.redirect('/');
//     }
//     try {
//         const info = jwt.verify(token, privateKey);
//         req.user = info;
//         next();
//     }
//     catch {
//         return res.redirect('/');
//     }
// }
// function guestAutorization(req, res, next) {
//     const token = req.cookies.token;
//     try {
//         jwt.verify(token, privateKey);
//         return res.redirect('/');
//     }
//     catch{
//         next();
//     }
// }
// function userStatus(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) {
//         req.isLoggedIn = false;
//     }
//     try {
//         const info = jwt.verify(token, privateKey);
//         req.user = info;
//         req.isLoggedIn = true;
//     }
//     catch{
//         req.isLoggedIn = false;
//     }
//     next();
// }

module.exports = {
    setToken,
    verifyToken
}