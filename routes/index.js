const express = require('express'),
    router = express.Router();
const middleware = require('../middleware/index');
//const User = require('../models/user');

const controller = require('../controller/index');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //Index
        router.get('/', controller.index(this.viewPath));
        //Register
        router.get('/register', controller.register(this.viewPath));

        router.post('/register', controller.registerPost);

        //Login
        router.get('/login', controller.login(this.viewPath));

        router.post(
            '/login',
            controller.loginAuthenticate,
            controller.loginRedirect
        );

        //Logout
        router.get('/logout', controller.logout);
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
