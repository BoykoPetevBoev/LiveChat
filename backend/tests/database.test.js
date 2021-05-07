const UserSchema = require('../database/models/Users');
const RoomSchema = require('../database/models/Room');
const setupDB = require('./test-setup');
const { 
    createUser, 
    findUser, 
    findUsers 
} = require('../database/database');

setupDB('Chat-Test-Database');
const user = {
    email: 'email',
    username: 'username',
    password: 'password'
}

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
    const invalidUser = await findUser(undefined);
    expect(savedUser.username).toBe(user.username);
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.password.length).toBe(60);
    expect(savedUser.friends.length).toBe(0);
    expect(savedUser.rooms.length).toBe(0);
    expect(invalidUser).toBeUndefined();
})

test('Get users from database', async () => {
    await createUser(user);
    const users = await findUsers({ username: user.username });
    const invalidUser = await findUsers(undefined);
    expect(users.length).toBe(1);
    expect(users[0]['username']).toEqual(user.username);
    expect(invalidUser).toBeUndefined();
})