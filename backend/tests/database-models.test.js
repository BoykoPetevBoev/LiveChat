const UserSchema = require('../database/models/Users');
const RoomSchema = require('../database/models/Room');
const MessageSchema = require('../database/models/Message');
const setupDB = require('./test-setup');

setupDB('Chat-Test-Database');
const user = {
    email: 'email',
    username: 'username',
    password: 'password'
}
const userModel = new UserSchema(user);
const room = {
    name: 'name',
    type: 'type',
    admin: userModel._id
}
const roomModel = new RoomSchema(room);
const message = {
    content: 'content',
    time: 'time',
    sender: userModel._id,
    room: roomModel._id
}
const messageModel = new MessageSchema(message);

test('User model schema', () => {
    expect(userModel._id).toBeTruthy();
    expect(userModel.email).toBe(user.email);
    expect(userModel.username).toBe(user.username);
    expect(userModel.password).toBe(user.password);
    expect(userModel.phone).toBe('');
    expect(userModel.image).toBe('');
    expect(userModel.address).toBe('');
    expect(userModel.website).toBe('');
    expect(userModel.rooms.length).toBe(0);
    expect(userModel.friends.length).toBe(0);
    expect(userModel.receivedRequests.length).toBe(0);
    expect(userModel.sentRequests.length).toBe(0);
})

test('Room model schema', () => {
    expect(roomModel._id).toBeTruthy();
    expect(roomModel.admin).toBe(room.admin);
    expect(roomModel.name).toBe(room.name);
    expect(roomModel.type).toBe(room.type);
    expect(roomModel.about).toBe('');
    expect(roomModel.image).toBe('');
    expect(roomModel.website).toBe('');
    expect(roomModel.messages.length).toBe(0);
    expect(roomModel.members.length).toBe(0);
    expect(roomModel.requests.length).toBe(0);
})

test('Message model chema', () => {
    expect(messageModel._id).toBeTruthy();
    expect(messageModel.time).toBe(message.time);
    expect(messageModel.sender).toBe(message.sender);
    expect(messageModel.room).toBe(message.room);
})