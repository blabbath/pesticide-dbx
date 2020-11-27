const express = require('express'),
    router = express.Router();

const controller = require('../controller/index');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //Index
        router.get('/', (req, res) => res.send('hello'));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
