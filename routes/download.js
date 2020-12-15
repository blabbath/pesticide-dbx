const express = require('express'),
    router = express.Router();
const middleware = require('../middleware/index');

const controller = require('../controller/download');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //Downloads
        router.get(
            '/',
            middleware.isLoggedIn,
            controller.downloads(this.viewPath)
        );
        return router;
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
