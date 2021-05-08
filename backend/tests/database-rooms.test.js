const UserSchema = require('../database/models/Users');
const RoomSchema = require('../database/models/Room');
const MessageSchema = require('../database/models/Message');
const setupDB = require('./test-setup');
const {
    createRoom,
    createMessage,
    findChatById,
    updateRoom,
} = require('../database/database');

setupDB('Chat-Test-Database');

const user = {
    email: 'email',
    username: 'username',
    password: 'password'
}
const savedUser = new UserSchema(user);
const room = {
    name: 'name',
    type: 'type',
    admin: savedUser._id
}
const savedRoom = new RoomSchema(room);
const message = {
    content: 'content',
    time: 'time',
    sender: savedUser._id,
    room: savedRoom._id
}
const savedMessage = new MessageSchema(message);

test('Save room to database', async () => {
    const invalidUser = await createRoom(undefined);
    const savedRoom = await createRoom(room);
    expect(invalidUser).toBeUndefined();
    expect(savedRoom._id).toBeTruthy();
    expect(savedRoom.admin).toBe(room.admin);
    expect(savedRoom.name).toBe(room.name);
    expect(savedRoom.type).toBe(room.type);
    expect(savedRoom.about).toBe('');
    expect(savedRoom.image).toBe('');
    expect(savedRoom.website).toBe('');
    expect(savedRoom.messages.length).toBe(0);
    expect(savedRoom.members.length).toBe(0);
    expect(savedRoom.requests.length).toBe(0);
})

test('Save message to database', async () => {
    const invalidUser = await createMessage(undefined);
    const savedMessage = await createMessage(message);
    expect(invalidUser).toBeUndefined();
    expect(savedMessage._id).toBeTruthy();
    expect(savedMessage.time).toBe(message.time);
    expect(savedMessage.sender).toBe(message.sender);
    expect(savedMessage.room).toBe(message.room);
})

test('Get room by id from database', async () => {
    const databaseRoom = await createRoom(room);
    const savedRoom = await findChatById(databaseRoom._id);
    // const invalidUser = await findChatById(undefined);
    // expect(invalidUser).toBeUndefined();
    expect(savedRoom._id).toBeTruthy();
    expect(savedRoom.admin).toStrictEqual(room.admin);
    expect(savedRoom.name).toBe(room.name);
    expect(savedRoom.type).toBe(room.type);
})
