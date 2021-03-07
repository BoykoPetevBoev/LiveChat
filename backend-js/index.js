const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const config = require('./config/config');
const databaseConfig = require('./database/config');
const expressConfig = require('./config/express');
const expressRouter = require('./server/router');
const socketIoConfig = require('./config/socketio');

const router = express.Router();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = config.port;

expressConfig(app, router);
expressRouter(router);
socketIoConfig(io);
databaseConfig();

server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})

