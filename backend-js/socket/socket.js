function socket(io) {
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);

        // socket.on('join',  ({ user, room }) => {
        //     // console.log(room);
        //     if (!user || !room || !room._id) return;
        //     console.log(`[socket.io] We have new connection. User id: ${user._id} Room id: ${room._id}`);

        //     socket.join(room._id)
        //     io.to(room._id).emit('message', { message: `${user.username} joined in room ${room.name}` });

        //     // socket.emit('message', { message: `${user.username} joined in room ${room.name}` })

        //     socket.on('chatMessage', ({room, message}) => {
        //         // console.log(message);
        //         io.in(room._id).emit('message', message);
        //     });



        //     // socket.on('chatMessage', ({ room, msgTemplate }) => {
        //     //     io.to(room._id).emit('message', msgTemplate);
        //     // })

        //     socket.on('disconnect', () => {
        //         console.log('[socket.io] Disconnect');
        //     })
        // })
        
        socket.on('chat-message', (msg) => {
            io.emit('chat-message', msg);
          });

        socket.on('disconnect', () => {
            console.log('user disconnected');
          });
    });
}

module.exports = socket