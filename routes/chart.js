const express = require('express'),
    router = express.Router();
const controller = require('../controller/chart');
const middleware = require('../middleware');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //SYNOPS
        router.get('/synops', middleware.getSavedState, controller.synops(this.viewPath));

        //PLI
        router.get('/pli', middleware.getSavedState, controller.pli(this.viewPath));

        //TLI
        router.get('/tli', middleware.getSavedState, controller.tli(this.viewPath));

        //TLI
        router.get('/pri', middleware.getSavedState, controller.pri(this.viewPath));

        //HRI
        router.get('/hri', middleware.getSavedState, controller.hri(this.viewPath));

        //SALES
        router.get('/sales', middleware.getSavedState, controller.sales(this.viewPath));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
