require('dotenv').config()

const config = {
        port: process.env.PORT,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
        dbAddress: 'softuni.dx3ut.mongodb.net',
        tokenKey: process.env.SECRET
}

module.exports = config;