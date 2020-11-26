const express = require('express'),
    router = express.Router();

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        router.get('/', (req, res) => {
            res.render(`${this.viewPath}/index`, {
                page: 'index',
                currentUser: req.user,
            });
        });
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
