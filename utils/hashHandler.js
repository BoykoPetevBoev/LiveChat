const bcrypt = require('bcrypt');

function hashPassword(password){
    const salt = bcrypt.genSaltSync(11);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
async function checkPassword(password, hash){
    const match = await bcrypt.compare(password, hash);
    return match;
}
module.exports = {
    hashPassword,
    checkPassword
}