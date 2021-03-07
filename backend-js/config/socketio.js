function socketIoConfig(io){

    io.on('connection', (socket) => {
        console.log('We have new connection');
        
        socket.on('disconnect', () => {
            console.log('Disconnect');
        })
    })
}

module.exports = socketIoConfig;