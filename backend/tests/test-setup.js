const UserSchema = require('../database/models/Users');
const RoomSchema = require('../database/models/Room');
const MessageSchema = require('../database/models/Message');
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.promise = global.Promise

const config = {
    dbUser: 'user',
    dbPassword: 123,
    dbAddress: 'softuni.dx3ut.mongodb.net',
    dbName: 'Chat-Test'
}

async function createCollection() {
   

    const userModel = new UserSchema(user);
    await userModel.save();
    // const room = {
    //     name: 'name',
    //     type: 'type',
    //     admin: userModel._id
    // }
    // const roomModel = new RoomSchema(room);
    // await roomModel.save();
    // const message = {
    //     content: 'content',
    //     time: 'time',
    //     sender: userModel._id,
    //     room: roomModel._id
    // }
    // const messageModel = new MessageSchema(message);
    // await messageModel.save();
}

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
        } catch (error) {
            if (error.message === 'ns not found') return
            if (error.message.includes('a background operation is currently running')) return
            console.log(error.message)
        }
    }
}

async function setupDB(dbName) {

    beforeAll(async () => {
        const url = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbAddress}/${dbName}?retryWrites=true&w=majority`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    })

    // beforeEach(async () => {
    //     await createCollection();
    // });

    afterEach(async () => {
        await removeAllCollections()
    })

    afterAll(async () => {
        await dropAllCollections()
        await mongoose.connection.close()
    })
}

// setupDB('Chat-Test')
module.exports = setupDB;
