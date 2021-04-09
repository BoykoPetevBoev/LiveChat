const socketio = require('socket.io');
const socket = require('../socket/socket')

function socketIoConfig(server) {

    const io = socketio(server, {
        cors: {
            origins: "http://localhost:3000",
        }
    });
    socket(io);
}

module.exports = socketIoConfig;