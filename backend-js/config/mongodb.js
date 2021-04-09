const mongoose = require('mongoose');
const config = require('./config');

function databaseConfig() {
    const databaseUrl = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbAddress}/${config.dbName}?retryWrites=true&w=majority`;

    return mongoose.connect(databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, databaseStatus);

    function databaseStatus(err) {
        err
        ? console.error(err)
        : console.log('[database] Database is setup and running');
    }
}

module.exports = databaseConfig;

