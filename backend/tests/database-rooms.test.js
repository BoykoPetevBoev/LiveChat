const UserSchema = require('../database/models/Users');
const RoomSchema = require('../database/models/Room');
const MessageSchema = require('../database/models/Message');
const setupDB = require('./test-setup');
const {
    createRoom,
    createMessage,
    findRoomById,
    updateRoom,
} = require('../database/database-room');

setupDB('Chat-Rooms');

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
    // afterAll(async () => {
    //     await dropAllCollections()
    //     await mongoose.connection.close()
    // })

    test('Save room', async () => {
        const createdRoom = await createRoom(roomModel);
        const savedRoom = await findRoomById(createdRoom._id);
        expect(savedRoom._id).toBeTruthy();
        expect(savedRoom.admin).toStrictEqual(roomModel.admin);
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
        // const room = await createRoom(roomModel);
        const savedRoom = await findRoomById(roomModel._id);
        // expect(savedRoom._id).toStrictEqual(roomModel._id);
        expect(savedRoom.admin).toStrictEqual(roomModel.admin);
        expect(savedRoom.name).toBe(roomModel.name);
        expect(savedRoom.type).toBe(roomModel.type);
    })

    test('Update room', async () => {
        // const room = await createRoom(roomModel);
        roomModel.name = 'updated-name';
        roomModel.type = 'updated-type';
        roomModel.about = 'updated-about';
        roomModel.image = 'updated-image';
        roomModel.website = 'updated-website';
        const savedRoom = await updateRoom(roomModel);
        // expect(savedRoom._id).toStrictEqual(roomModel._id);
        expect(savedRoom.name).toBe(roomModel.name);
        expect(savedRoom.type).toBe(roomModel.type);
        expect(savedRoom.about).toBe(roomModel.about);
        expect(savedRoom.image).toBe(roomModel.image);
        expect(savedRoom.website).toBe(roomModel.website);
    })
})
