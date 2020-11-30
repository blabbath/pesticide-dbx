const express = require('express'),
    router = express.Router();
const controller = require('../controller/chart');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //SYNOPS
        router.get('/synops', controller.synops(this.viewPath));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
