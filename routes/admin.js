const express = require('express'),
    router = express.Router();
const controller = require('../controller/admin');
const middleware = require('../middleware');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //Admin
        router.get('/', middleware.isAdmin, controller.index(this.viewPath));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
