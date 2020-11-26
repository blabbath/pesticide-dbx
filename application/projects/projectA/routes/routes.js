const express = require('express'),
    router = express.Router();

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        router.get('/', (req, res) => {
            res.render(`${this.viewPath}/indexA`, {});
        });
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
