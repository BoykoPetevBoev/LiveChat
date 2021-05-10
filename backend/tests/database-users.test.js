const UserSchema = require('../database/models/Users');
const setupDB = require('./test-setup');
const {
    createUser,
    findUsers,
    findUser,
    findUserById,
    updateUser,
} = require('../database/database');

setupDB('Chat-Test-Database');

const userModel = new UserSchema({
    email: 'email',
    username: 'username',
    password: 'password'
});

describe('User Tests', () => {
    
    test('Save user', async () => {
        const createdUser =  await createUser(userModel)
        const savedUser = await findUserById(createdUser._id);
        expect(savedUser.email).toBe(createdUser.email);
        expect(savedUser.username).toBe(createdUser.username);
        expect(savedUser.password).toBe(createdUser.password);
        expect(savedUser.phone).toBe('');
        expect(savedUser.image).toBe('');
        expect(savedUser.address).toBe('');
        expect(savedUser.website).toBe('');
        expect(savedUser.rooms.length).toBe(0);
        expect(savedUser.friends.length).toBe(0);
        expect(savedUser.receivedRequests.length).toBe(0);
        expect(savedUser.sentRequests.length).toBe(0);
    })

    test('Get user by selector', async () => {
        await createUser(userModel)
        const savedUser = await findUser({ email: userModel.email });
        expect(savedUser.email).toBe(userModel.email);
        expect(savedUser.username).toBe(userModel.username);
        // expect(savedUser.password).toBe(userModel.password);
    })

    test('Get user by id', async () => {
        const user = await createUser(userModel);
        const savedUser = await findUserById(user._id);
        expect(savedUser.email).toBe(user.email);
        expect(savedUser.username).toBe(user.username);
        // expect(savedUser.password).toBe(userModel.password);
    })

    test('Get users', async () => {
        const user = await createUser(userModel)
        const savedUsers = await findUsers({ username: user.username });
        expect(savedUsers.length).toBe(1);
        expect(savedUsers[0]['username']).toEqual(user.username);
        expect(savedUsers[0]['email']).toEqual(user.email);
        // expect(savedUsers[0]['password']).toEqual(userModel.password);
    })

    test('Update user', async () => {
        const user = await createUser(userModel)
        user.username = 'updated-username';
        user.password = 'updated-password';
        user.phone = 'updated-phone';
        user.image = 'updated-image';
        user.address = 'updated-address';
        user.website = 'updated-website';
        const savedUser = await updateUser(user)
        expect(savedUser.email).toBe(user.email);
        expect(savedUser.username).toBe(user.username);
        expect(savedUser.password).toBe(user.password);
        expect(savedUser.phone).toBe(user.phone);
        expect(savedUser.image).toBe(user.image);
        expect(savedUser.address).toBe(user.address);
        expect(savedUser.website).toBe(user.website);
    })
})

