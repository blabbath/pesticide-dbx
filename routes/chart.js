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

        //PLI
        router.get('/pli', controller.pli(this.viewPath));

        //TLI
        router.get('/tli', controller.tli(this.viewPath));

        //TLI
        router.get('/pri', controller.pri(this.viewPath));

        //HRI
        router.get('/hri', controller.hri(this.viewPath));

        //SALES
        router.get('/sales', controller.sales(this.viewPath));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
