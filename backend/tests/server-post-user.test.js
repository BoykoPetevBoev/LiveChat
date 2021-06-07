const supertest = require('supertest');
const expressConfig = require('../config/express');
const UserSchema = require('../database/models/Users');
const setupDB = require('./test-setup');


const {
    createUser,
    findUser,
    findUserById,
    findUsers,
    updateUser
} = require('../database/database-user');

setupDB('Server-Post-User-Tests');

const app = expressConfig();
const user = {
    email: 'test',
    username: 'test',
    password: 'test'
}
let savedUser = {};

describe('Server-Post-User-Tests', () => {

    test('/register', async () => {
        const resValid = await supertest(app).post('/user/register').send(user);
        savedUser = await UserSchema.findOne({ email: user.email });
        
        expect(resValid.statusCode).toEqual(200);
        expect(savedUser.username).toBe(user.username);
        expect(savedUser.email).toBe(user.email);
        expect(savedUser.password.length).toBe(60);
        expect(savedUser.friends.length).toBe(0);
        expect(savedUser.rooms.length).toBe(0);
        
        const resInvalid = await supertest(app).post('/user/register').send(undefined);
        expect(resInvalid.statusCode).toEqual(401);
        
        const resRegistered = await supertest(app).post('/user/register').send(user);
        expect(resRegistered.statusCode).toEqual(401);
    })
    
    test('/login', async () => {
        const resInvalid = await supertest(app).post('/user/login').send(undefined);
        expect(resInvalid.statusCode).toEqual(401);
        
        const resValid = await supertest(app).post('/user/login').send(user);
        expect(resValid.statusCode).toEqual(200);
        expect(resValid.header.authorization).toBeTruthy();
    })
    
    test('/user/update', async () => {
        savedUser.username = 'updated-username';
        savedUser.phone = 'updated-phone';
        savedUser.image = 'updated-image';
        savedUser.address = 'updated-address';
        savedUser.website = 'updated-website';
        
        const updatedUser = await supertest(app).post('/user/update').send(savedUser);
        expect(updatedUser.statusCode).toBe(200);
        expect(updatedUser.body.email).toBe(savedUser.email);
        expect(updatedUser.body.username).toBe(savedUser.username);
        expect(updatedUser.body.password).toBe(savedUser.password);
        expect(updatedUser.body.phone).toBe(savedUser.phone);
        expect(updatedUser.body.image).toBe(savedUser.image);
        expect(updatedUser.body.address).toBe(savedUser.address);
        expect(updatedUser.body.website).toBe(savedUser.website);

        const databaseUser = await findUser(savedUser);
        expect(databaseUser.email).toBe(savedUser.email);
        expect(databaseUser.username).toBe(savedUser.username);
        expect(databaseUser.password).toBe(savedUser.password);
        expect(databaseUser.phone).toBe(savedUser.phone);
        expect(databaseUser.image).toBe(savedUser.image);
        expect(databaseUser.address).toBe(savedUser.address);
        expect(databaseUser.website).toBe(savedUser.website);
    })

    test('/user/update-password', async () => {
        const invalidPassword = await supertest(app).post('/user/update-password').send(undefined);
        expect(invalidPassword.statusCode).toBe(401);
        
        const updatedUser = await supertest(app).post('/user/update-password').send({
            user: savedUser,
            currPassword: 'test',
            newPassword: 'updated-password'
        });
        expect(updatedUser.statusCode).toBe(200);
        expect(updatedUser.body.password).not.toBe(savedUser.password);
    })
})