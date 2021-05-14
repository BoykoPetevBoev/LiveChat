const { 
    userLogin, 
    userRegister,
    sendFriendRequest, 
    removeFriendRequest,
    acceptFriendRequest,
    removeFriend,
    updatePassword,
    userUpdate
 } = require('./handlers-post-user');

const {
    userAuthorization,
    getUsersByUsername,
    getGroup,
    getPublicGroups,
} = require('./handlers-get');

const {
    createGroup,
    updateGroup,
    sendGroupRequest
} = require('./handlers-post-room');

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
        res.status(404).json({error: 'Not found!'});
    })
}

module.exports = expressRouter;