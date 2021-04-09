const http = require('http');

const config = require('./config/config');
const databaseConfig = require('./config/mongodb');
const expressConfig = require('./config/express');
const socketIoConfig = require('./config/socketio');

const app = expressConfig()
const server = http.createServer(app);



const io = socketIoConfig(server);
databaseConfig();

const port = config.port;
server.listen(port, () => {
    console.log(`[server] Server has started on port ${port}`);
});

