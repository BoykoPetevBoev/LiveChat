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
const userModel = new UserSchema({
    email: 'test',
    username: 'test',
    password: 'test'
})
const room ={
    name: 'name',
    type: 'type',
    admin: userModel,
    members: [userModel]
};

describe('Server-Post-Room-Tests', () => {
    
    test('/group/create', async () => {
        const undefinedGroup = await supertest(app).post('/group/create').send(undefined);
        expect(undefinedGroup.statusCode).toEqual(401);
        
        const user = await createUser(userModel)
        const validGroup = await supertest(app).post('/group/create').send(room);
        expect(validGroup.statusCode).toEqual(200);
        expect(validGroup.body._id).toBeTruthy();
        expect(validGroup.body.name).toBe(room.name);
        expect(validGroup.body.type).toBe(room.type);
        expect(validGroup.body.members.length).toBe(1);
        
        const savedGroup = await findRoomById(validGroup.body._id)
        expect(savedGroup._id).toBeTruthy();
        expect(savedGroup.name).toBe(room.name);
        expect(savedGroup.type).toBe(room.type);
        expect(savedGroup.members.length).toBe(1);
        
        const updatedUser = await findUserById(user._id);
        expect(updatedUser.rooms.length).toBe(1);
    })
    // test('/group/update', async () => {})
    // test('/group/send-join-request', async () => {})
})