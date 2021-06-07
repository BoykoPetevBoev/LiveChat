const supertest = require('supertest');
const expressConfig = require('../config/express');
const UserSchema = require('../database/models/Users');
const RoomSchema = require('../database/models/Room');
const { verifyToken } = require('../server/utils');

const setupDB = require('./test-setup');

setupDB('Chat-Server-Get');

const app = expressConfig();
const userModel = new UserSchema({
    email: 'test',
    username: 'testServer',
    password: 'testServer'
})
const roomModel = new RoomSchema({
    name: 'name',
    type: 'type',
    admin: userModel._id
});

describe('Server-Get-Tests', () => {

    test('/verify', async () => {
        const undefinedToken = await supertest(app).get('/verify');
        expect(undefinedToken.statusCode).toEqual(401);
        
        // const invalidToken = await supertest(app).get('/verify?token=invalid.invalid.invalid');
        // expect(invalidToken.statusCode).toEqual(401);
        
        // const token = verifyToken(userModel);
        // const validToken = await supertest(app).get(`/verify?token=${token}`);
        
        // expect(invalidToken.statusCode).toEqual(200);
        // expect(validToken.body.email).toBe(userModel.email);
        // expect(validToken.body.username).toBe(userModel.username);
    })

    test('/users', async () => {
        const invalidRequest = await supertest(app).get(`/users`);
        expect(invalidRequest.statusCode).toEqual(401);

        const emptyRequest = await supertest(app).get(`/users?username=invalid`);
        expect(emptyRequest.statusCode).toEqual(200);
        expect(emptyRequest.body).toEqual([]);

        await userModel.save();
        const correctRequest = await supertest(app).get(`/users?username=${userModel.username}`);
        expect(correctRequest.statusCode).toEqual(200);
        expect(correctRequest.body.length).toEqual(1);
        expect(correctRequest.body[0].email).toBe(userModel.email);
        expect(correctRequest.body[0].username).toBe(userModel.username);
    })

    test('/group', async () => {
        const invalidRequest = await supertest(app).get('/group');
        expect(invalidRequest.statusCode).toEqual(401);

        const emptyRequest = await supertest(app).get(`/group?id=6075bcfc00c9451a10477a31`);
        expect(emptyRequest.statusCode).toEqual(200);
        expect(emptyRequest.body).toEqual({});

        await roomModel.save();
        const correctRequest = await supertest(app).get(`/group?id=${roomModel._id}`);
        expect(correctRequest.statusCode).toEqual(200);
        expect(correctRequest.body.name).toBe(roomModel.name);
        expect(correctRequest.body.type).toBe(roomModel.type);
    })

    test('/group/public', async () => {
        const emptyRequest = await supertest(app).get('/groups/public');
        expect(emptyRequest.statusCode).toEqual(200);
        expect(emptyRequest.body).toEqual([]);

        const room = new RoomSchema({
            name: 'name',
            type: 'public',
            admin: userModel._id
        })
        await room.save();
        const correctRequest = await supertest(app).get('/groups/public');
        expect(correctRequest.statusCode).toEqual(200);
        expect(correctRequest.body.length).toBe(1);
        expect(correctRequest.body[0].name).toBe(room.name);
        expect(correctRequest.body[0].type).toBe(room.type);
    })

    test('/404', async () => {
        const res = await supertest(app).get('/404');
        expect(res.statusCode).toEqual(404);
    })
})