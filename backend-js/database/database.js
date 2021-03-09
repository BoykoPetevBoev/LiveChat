const UserSchema = require('./models/Users');
const { hashPassword, checkPassword } = require('./utils');

async function createUser(userFormData) {
    userFormData.password = hashPassword(userFormData.password)
    const user = new UserSchema(userFormData);
    const successfull = await user.save();

    return user;
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
    console.error(err);
    
}

async function findUsers(username) {
    const users = UserSchema.find(username)
    return users;
}




module.exports = {
    // getAllUsers,
    createUser,
    getUser,
    findUsers
}