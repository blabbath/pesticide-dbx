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
        router.get('/', middleware.isLoggedIn, controller.downloads(this.viewPath));

        router.get('/down_syn1996', (req,res) => res.send('hello'))
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
