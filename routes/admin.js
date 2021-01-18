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

        router.get(
            '/chart',
            [middleware.isAdmin, middleware.getSavedState],
            controller.chart(this.viewPath)
        );

        router.post('/receive_data', middleware.isAdmin, controller.receiveData);

        router.get('/risk_ind', middleware.isAdmin, controller.sendRiskInd);

        router.get('/subgrps_admin', middleware.isAdmin, controller.sendSubgrps);

        router.get('/visData_admin', middleware.isAdmin, controller.sendData);
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
