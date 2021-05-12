const { 
    userLogin, 
    userRegister,
    getUsersByUsername, 
    sendFriendRequest, 
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend,
    userAuthorization,
    getGroup,
    createGroup,
    updateGroup,
    updatePassword,
    userUpdate,
    getPublicGroups,
    sendGroupRequest } = require('./handlers');

function expressRouter(router){   
    router.get('/users', getUsersByUsername);
    router.get('/verify', userAuthorization);
    router.get('/group', getGroup);
    router.get('/groups/public', getPublicGroups);
    
    router.post('/user/login', userLogin);
    router.post('/user/register', userRegister);
    router.post('/user/update', userUpdate);
    router.post('/user/update-password', updatePassword);
    router.post('/user/send-friend-request', sendFriendRequest);
    router.post('/user/remove-friend-request', removeFriendRequest);
    router.post('/user/accept-friend-request', acceptFriendRequest);
    router.post('/user/remove-friend', removeFriend);

    router.post('/group/create', createGroup);
    router.post('/group/update', updateGroup);
    router.post('/group/send-join-request', sendGroupRequest);
    
    router.use('*', (req, res) => {
        res.status(404).json({erroe: 'Not found!'});
    })
}

module.exports = expressRouter;