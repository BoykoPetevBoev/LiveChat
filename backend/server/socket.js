const { createMessage, findRoomById, updateRoom } = require("../database/database-room");
const {
  setToken,
  verifyToken,
  addId,
  removeId,
  areTheyFriends
} = require('./utils');

function socket(io) {
  io.on('connection', (socket) => {
    console.log(`[socket.io] ${socket.id} connected`);

    socket.on('join', (user) => {
      console.log(`[socket.io] We have new connection. User id: ${socket.id} Room id: ${user._id}`);

      socket.join(user._id)
      io.to(room._id).emit('message', { message: `${user.username} is online` });
    })

    socket.on('chat-message', async ({ chat, message }) => {
      const room = chat._id;
      const sender = message.sender._id
      const content = message.content;
      const time = message.time

      if (!room || !sender || !content || !time) return;

      const savedMessage = await createMessage({ room, sender, content, time });
      const savedChat = await findRoomById(room);
      savedChat.messages = addId(savedChat.messages, savedMessage._id);
      const updatedChat = await updateRoom(savedChat);
      io.emit('message', updatedChat);
    });

    socket.on('disconnect', () => {
      console.log(`[socket.io] ${socket.id}  disconnected`);
    });
  });
}

module.exports = socket