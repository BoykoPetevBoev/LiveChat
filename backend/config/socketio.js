const socketio = require('socket.io');
const socket = require('../server/socket')

const URL = "http://localhost:3000";

function socketIoConfig(server) {

    const io = socketio(server, {
        cors: {
            origins: URL
        }
    });
    socket(io);
}

module.exports = socketIoConfig;