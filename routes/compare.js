const express = require('express'),
    router = express.Router();
const middleware = require('../middleware');
const controller = require('../controller/compare')

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //SYNOPS
        router.get('/', controller.index(this.viewPath));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
