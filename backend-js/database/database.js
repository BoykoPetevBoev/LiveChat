const bcrypt = require('bcrypt');
const UserSchema = require('./models/Users');

function createUser(userFormData) {
    userFormData.password = hashPassword(userFormData.password)
    const user = new UserSchema(userFormData);
    console.log(user);
}

async function getUser(selector) {
    const user = await UserSchema.findOne(selector).exec();
    return user;
}

// function getAllUsers() {
//     return dbUsers.allDocs()
//         .then(res => {
//             console.log(res);
//             return res;
//         })
//         .catch(errorHandler);
// }

function errorHandler(err) {
    console.log(err);
}


function hashPassword(password){
    if(typeof password !== 'string') return undefined;
    const salt = bcrypt.genSaltSync(11);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
async function checkPassword(password, hash){
    if(typeof password !== 'string' || typeof hash !== 'string') return undefined;
    const match = await bcrypt.compare(password, hash);
    return match;
}


module.exports = {
    // getAllUsers,
    createUser,
    getUser
}