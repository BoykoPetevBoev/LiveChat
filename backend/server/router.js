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
    updateGrpup,
    updatePassword,
    userUpdate,
    getPublicGroups } = require('./handlers');

function expressRouter(router){   
    router.get('/users', getUsersByUsername);
    router.get('/verify', userAuthorization);
    router.get('/chat', getChat);
    router.get('/groups/public', getPublicGroups);
    
    router.post('/user/login', userLogin);
    router.post('/user/register', userRegister);
    router.post('/user/update', userUpdate);
    router.post('/user/update-password', updatePassword);
    router.post('/user/send-friend-request', sendFriendRequest);
    router.post('/user/remove-friend-request', removeFriendRequest);
    router.post('/user/accept-friend-request', acceptFriendRequest);
    router.post('/user/remove-friend', removeFriend);

    router.post('/chat/create', createGroup);
    router.post('/chat/update', updateGrpup);
    
    router.use('*', (req, res) => {
        res.status(404).json({erroe: 'Not found!'});
    })
}

module.exports = expressRouter;