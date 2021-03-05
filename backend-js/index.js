const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router.js');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

const io = socketio(server);
io.on('connection', (socket) => {
    console.log('We have new connection');
    
    socket.on('disconnect', () => {
        console.log('Disconnect');
    })
})

app.use(cors({
    exposedHeaders: 'Authorization'
}));
app.use(express.json());
app.use(express.static('static'));
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(router);

server.listen(PORT, () => {
    console.log('Server has started on port ' + PORT);
})
