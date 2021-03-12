
require('dotenv').config()
const env = process.env.NODE_ENV || 'development';


const config1 = {
    development: {
        port: 5000 || process.env.PORT || 5000,
        dbUser: process.env.DB_USER || 'user',
        dbPassword: process.env.DB_PASS || 123,
        dbName: process.env.DB_NAME || 'Chat',
        dbAddress: 'softuni.dx3ut.mongodb.net',
        tokenKey: process.env.SECRET || 'SuperSecretKey'
    },
    production: {}
}

const config = {
    port: 5000,
    dbUser: 'user',
    dbPassword: 123,
    dbName: 'Chat',
    dbAddress: 'softuni.dx3ut.mongodb.net',
    tokenKey: 'SuperSecretKey'
}

module.exports = config;