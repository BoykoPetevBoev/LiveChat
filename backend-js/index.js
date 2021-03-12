const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const config = require('./config/config');
const databaseConfig = require('./database/config');
const expressConfig = require('./config/express');

const socketIoConfig = require('./config/socketio');

const app = expressConfig()
const server = http.createServer(app);
// const io = socketio(server);
const port = config.port;

// expressConfig(app, router);

// socketIoConfig(io);
databaseConfig();

server.listen(port, () => {
    console.log(`[server] Server has started on port ${port}`);
})

// module.exports = {
//     app
// }

