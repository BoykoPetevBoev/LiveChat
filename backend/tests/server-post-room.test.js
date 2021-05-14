const supertest = require('supertest');
const expressConfig = require('../config/express');
const UserSchema = require('../database/models/Users');
const RoomSchema = require('../database/models/Room');
const {
    createGroup,
    updateGroup,
    sendGroupRequest
} = require('../server/handlers-post-room');

const {
    createUser,
    findUser,
    findUserById,
    findUsers,
    updateUser
} = require('../database/database-user');

const {
    createRoom,
    createMessage,
    findRoomById,
    updateRoom,
    findRooms
} = require('../database/database-room');
const setupDB = require('./test-setup');

setupDB('Server-Post-Room-Tests');

const app = expressConfig();

const user = {
    email: 'test',
    username: 'test',
    password: 'test'
}
const room = {
    name: 'name',
    type: 'type',
    members: []
};

let savedGroup = {}
let savedUser = {}

describe('Server-Post-Room-Tests', () => {

    test('/group/create', async () => {
        const undefinedGroup = await supertest(app).post('/group/create').send(undefined);
        expect(undefinedGroup.statusCode).toEqual(401);

        savedUser = await createUser(user)
        room.members.push(savedUser);
        const validGroup = await supertest(app).post('/group/create').send(room);
        savedGroup = validGroup.body;
        expect(validGroup.statusCode).toEqual(200);
        expect(validGroup.body._id).toBeTruthy();
        expect(validGroup.body.name).toBe(room.name);
        expect(validGroup.body.type).toBe(room.type);
        expect(validGroup.body.members.length).toBe(1);

        const findGroup = await findRoomById(validGroup.body._id);
        expect(findGroup._id).toBeTruthy();
        expect(findGroup.name).toBe(room.name);
        expect(findGroup.type).toBe(room.type);
        expect(findGroup.members.length).toBe(1);

        const updatedUser = await findUserById(savedUser._id);
        expect(updatedUser.rooms.length).toBe(1);
    })

    test('/group/send-join-request', async () => {
        const undefinedGroup = await supertest(app)
            .post('/group/send-join-request')
            .send({ senderId: undefined, groupId: undefined });
        expect(undefinedGroup.statusCode).toEqual(401);

        const validGroup = await supertest(app)
            .post('/group/send-join-request')
            .send({ senderId: savedUser._id, groupId: savedGroup._id });
        expect(validGroup.body.requests.length).toBe(1);
    })

    test('/group/update', async () => {
        const undefinedGroup = await supertest(app).post('/group/update').send(undefined);
        expect(undefinedGroup.statusCode).toEqual(401);

        savedGroup.about = 'updated-about';
        savedGroup.image = 'updated-image';
        savedGroup.website = 'updated-website';
        savedGroup.name = 'updated-name';
        savedGroup.type = 'updated-type';
        savedGroup.members.push(savedUser);

        const updatedGroup = await supertest(app).post('/group/update').send(savedGroup);
        expect(updatedGroup.statusCode).toEqual(200);
        expect(updatedGroup.body.about).toEqual(savedGroup.about);
        expect(updatedGroup.body.image).toEqual(savedGroup.image);
        expect(updatedGroup.body.website).toEqual(savedGroup.website);
        expect(updatedGroup.body.name).toEqual(savedGroup.name);
        expect(updatedGroup.body.type).toEqual(savedGroup.type);
        expect(updatedGroup.body.members.length).toEqual(2);
        expect(updatedGroup.body.requests.length).toEqual(0);

        // const updatedUser = await findUserById(savedUser._id);
        // expect(updatedUser.rooms.length).toBe(1);
    })

})