const { 
    userLogin, 
    userRegister,
    getUsersByUsername, 
    sendFriendRequest, 
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend,
    userAuthorization,
    getChat,
    createGroup,
    updatePassword } = require('./handlers');

function expressRouter(router){   
    router.get('/users', getUsersByUsername);
    router.get('/verify', userAuthorization);
    router.get('/chat', getChat);

    router.post('/register', userRegister);
    router.post('/login', userLogin);
    router.post('/send-friend-request', sendFriendRequest)
    router.post('/remove-friend-request', removeFriendRequest)
    router.post('/accept-friend-request', acceptFriendRequest)
    router.post('/remove-friend', removeFriend)
    router.post('/group-create', createGroup)
    router.post('/update-password', updatePassword)

    router.use('*', (req, res) => {
        res.status(404).json({erroe: 'Not found!'});
    })
}

module.exports = expressRouter;