const socketio = require('socket.io');
const http = require('http');

const config = require('./config/config');
const databaseConfig = require('./database/config');
const expressConfig = require('./config/express');
const socketIoConfig = require('./config/socketio');

const app = expressConfig()
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origins: "http://localhost:3000",
    }
});
// io.on('connection', (socket) => {
//     console.log('We have new connection');

//     socket.on('disconnect', () => {
//         console.log('Disconnect');
//     })
// })
socketIoConfig(io);
databaseConfig();

const port = config.port;
server.listen(port, () => {
    console.log(`[server] Server has started on port ${port}`);
});

