require('dotenv').config()

const config = {
        port: process.env.PORT || 5000,
        dbUser: process.env.DB_USER || 'user',
        dbPassword: process.env.DB_PASS || 123,
        dbName: process.env.DB_NAME || 'Chat',
        dbAddress: 'softuni.dx3ut.mongodb.net',
        tokenKey: process.env.SECRET || 'SuperSecretKey'
}

module.exports = config;