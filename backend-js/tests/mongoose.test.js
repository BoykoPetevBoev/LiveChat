const mongoose = require('mongoose');
const UserSchema = require('../database/models/Users');
const { setupDB } = require('./test-setup')
const {
    createUser,
    findUser,
    findUsers
} = require('../database/database');

mongoose.set('useCreateIndex', true);
setupDB('Chat-Test');
const user = {
    email: 'test',
    username: 'test',
    password: 'test'
}

test('Mongoose model schema', () => {
    const userModel = new UserSchema(user);
    expect(userModel.email).toBe(user.email);
    expect(userModel.username).toBe(user.username);
    expect(userModel.password).toBe(user.password);
    expect(userModel.friends.length).toBe(0);
    expect(userModel.rooms.length).toBe(0);
    expect(userModel._id).toBeTruthy();
})

test('Save user to database', async () => {
    await createUser(user);
    const savedUser = await UserSchema.findOne({ email: user.email });
    expect(savedUser.username).toBe(user.username);
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.password.length).toBe(60);
    expect(savedUser.friends.length).toBe(0);
    expect(savedUser.rooms.length).toBe(0);
})

test('Get user from database', async () => {
    await createUser(user);
    const savedUser = await findUser({ email: user.email });
    expect(savedUser.username).toBe(user.username);
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.password.length).toBe(60);
    expect(savedUser.friends.length).toBe(0);
    expect(savedUser.rooms.length).toBe(0);
})

test('Get users from database', async () => {
    await createUser(user);
    const users = await findUsers({ username: user.username });
    expect(users.length).toBe(1);
    expect(users[0]['username']).toEqual(user.username);
})