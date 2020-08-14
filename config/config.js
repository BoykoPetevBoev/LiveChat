require('dotenv').config()
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
        dbAddress: 'softuni-dx3ut.mongodb.net',
        tokenKey: process.env.SECRET
    },
    production: {}
}

module.exports = config[env];