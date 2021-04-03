const { 
    userLogin, 
    userRegister, 
    showUsers, 
    getUsersByUsername, 
    sendFriendRequest, 
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend } = require('./handlers');

function expressRouter(router){   
    router.get('/', showUsers);
    router.get('/users', getUsersByUsername);

    router.post('/register', userRegister);
    router.post('/login', userLogin);
    router.post('/send-friend-request', sendFriendRequest)
    router.post('/remove-friend-request', removeFriendRequest)
    router.post('/accept-friend-request', acceptFriendRequest)
    router.post('/remove-friend', removeFriend)

    router.use('*', (req, res) => {
        res.status(404).json({erroe: 'Not found!'});
    })
    
}

module.exports = expressRouter;