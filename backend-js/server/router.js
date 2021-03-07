const { userLogin, userRegister, showUsers } = require('./handlers');

function expressRouter(router){   
    router.get('/', showUsers);
    router.post('/login', userLogin);
    router.post('/register', userRegister);
}

module.exports = expressRouter;