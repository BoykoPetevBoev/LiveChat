const { userLogin, userRegister, showUsers, getUsersByUsername } = require('./handlers');

function expressRouter(router){   
    router.get('/', showUsers);
    router.get('/users', getUsersByUsername);

    router.post('/login', userLogin);
    router.post('/register', userRegister);

    router.use('*', (req, res) => {
        res.status(404).json({erroe: 'Not found!'})
    })
}

module.exports = expressRouter;