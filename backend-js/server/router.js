const { userLogin, userRegister, showUsers, getUsersByUsername } = require('./handlers');

function expressRouter(router){   
    router.get('/', showUsers);
    router.get('/users', getUsersByUsername);

    router.post('/login', userLogin);
    router.post('/register', userRegister);
}

module.exports = expressRouter;