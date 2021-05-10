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

const userModel = new UserSchema({
    email: 'email',
    username: 'username',
    password: 'password'
});
const roomModel = new RoomSchema({
    name: 'name',
    type: 'type',
    admin: userModel._id
});
const message = {
    content: 'content',
    time: 'time',
    sender: userModel._id,
    room: roomModel._id
}

describe('Room Tests', () => {

    test('Save room', async () => {
        const savedRoom = await createRoom(roomModel);
        expect(savedRoom._id).toBeTruthy();
        expect(savedRoom.admin).toBe(roomModel.admin);
        expect(savedRoom.name).toBe(roomModel.name);
        expect(savedRoom.type).toBe(roomModel.type);
        expect(savedRoom.about).toBe('');
        expect(savedRoom.image).toBe('');
        expect(savedRoom.website).toBe('');
        expect(savedRoom.messages.length).toBe(0);
        expect(savedRoom.members.length).toBe(0);
        expect(savedRoom.requests.length).toBe(0);
    })

    test('Save message', async () => {
        const savedMessage = await createMessage(message);
        expect(savedMessage._id).toBeTruthy();
        expect(savedMessage.time).toBe(message.time);
        expect(savedMessage.sender).toBe(message.sender);
        expect(savedMessage.room).toBe(message.room);
    })

    test('Get room by id', async () => {
        const room = await createRoom(roomModel);
        const savedRoom = await findChatById(room._id);
        expect(savedRoom._id).toStrictEqual(room._id);
        expect(savedRoom.admin).toStrictEqual(room.admin);
        expect(savedRoom.name).toBe(room.name);
        expect(savedRoom.type).toBe(room.type);
    })
    
    test('Update room', async () => {
        const room = await createRoom(roomModel);
        room.name = 'updated-name';
        room.type = 'updated-type';
        room.about = 'updated-about';
        room.image = 'updated-image';
        room.website = 'updated-website';
        const savedRoom = await updateRoom(room);
        expect(savedRoom._id).toStrictEqual(room._id);
        expect(savedRoom.name).toBe(room.name);
        expect(savedRoom.type).toBe(room.type);
        expect(savedRoom.about).toBe(room.about);
        expect(savedRoom.image).toBe(room.image);
        expect(savedRoom.website).toBe(room.website);
    })
})
