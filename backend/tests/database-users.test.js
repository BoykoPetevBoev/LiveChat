const UserSchema = require('../database/models/Users');
const setupDB = require('./test-setup');
const {
    createUser,
    findUsers,
    findUser,
    findUserById,
    updateUser
} = require('../database/database-user');

setupDB('Chat-Users');

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
        const savedUser = await findUser({ email: userModel.email });
        expect(savedUser.email).toBe(userModel.email);
        expect(savedUser.username).toBe(userModel.username);
    })

    test('Get user by id', async () => {
        const savedUser = await findUserById(userModel._id);
        expect(savedUser.email).toBe(userModel.email);
        expect(savedUser.username).toBe(userModel.username);
    })

    test('Get users', async () => {
        const savedUsers = await findUsers({ username: userModel.username });
        expect(savedUsers.length).toBe(1);
        expect(savedUsers[0]['username']).toEqual(userModel.username);
        expect(savedUsers[0]['email']).toEqual(userModel.email);
    })

    test('Update user', async () => {
        userModel.username = 'updated-username';
        userModel.password = 'updated-password';
        userModel.phone = 'updated-phone';
        userModel.image = 'updated-image';
        userModel.address = 'updated-address';
        userModel.website = 'updated-website';
        const savedUser = await updateUser(userModel)
        expect(savedUser.email).toBe(userModel.email);
        expect(savedUser.username).toBe(userModel.username);
        expect(savedUser.password).toBe(userModel.password);
        expect(savedUser.phone).toBe(userModel.phone);
        expect(savedUser.image).toBe(userModel.image);
        expect(savedUser.address).toBe(userModel.address);
        expect(savedUser.website).toBe(userModel.website);
    })
})

