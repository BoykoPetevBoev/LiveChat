const { userLogin, userRegister, showUsers, getUsersByUsername, sendFriendRequest } = require('./handlers');

function expressRouter(router){   
    router.get('/', showUsers);
    router.get('/users', getUsersByUsername);

    router.post('/register', userRegister);
    router.post('/login', userLogin);
    router.post('/send-friend-request', sendFriendRequest)

    router.use('*', (req, res) => {
        res.status(404).json({erroe: 'Not found!'});
    })
    
}

module.exports = expressRouter;