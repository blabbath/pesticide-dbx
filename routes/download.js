const express = require('express'),
    router = express.Router();
const middleware = require('../middleware/index');

const controller = require('../controller/download');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //SYNOPS Downloads
        router.get('/down_syn1996', middleware.isLoggedIn,controller.dowloadCSV('syn_1996'))
        router.get('/down_syn2001', middleware.isLoggedIn,controller.dowloadCSV('syn_2001'))
        router.get('/down_syn2011', middleware.isLoggedIn,controller.dowloadCSV('syn_2011'))

        //PLI Downloads
        router.get('/down_pli1996', middleware.isLoggedIn, controller.dowloadCSV('pli_1996'))
        router.get('/down_pli2001', middleware.isLoggedIn, controller.dowloadCSV('pli_2001'))
        router.get('/down_pli2011', middleware.isLoggedIn, controller.dowloadCSV('pli_2011'))

        //TLI Downloads
        router.get('/down_tli1996', middleware.isLoggedIn, controller.dowloadCSV('tli_1996'))
        router.get('/down_tli2001', middleware.isLoggedIn, controller.dowloadCSV('tli_2001'))
        router.get('/down_tli2011', middleware.isLoggedIn, controller.dowloadCSV('tli_2011'))
        //PRI Downloads
        router.get('/down_pri1996', middleware.isLoggedIn, controller.dowloadCSV('pri_1996'))
        router.get('/down_pri2001', middleware.isLoggedIn, controller.dowloadCSV('pri_2001'))
        router.get('/down_pri2011', middleware.isLoggedIn, controller.dowloadCSV('pri_2011'))
        //HRI Downloads
        router.get('/down_hri1996', middleware.isLoggedIn, controller.dowloadCSV('hri_1996'))
        router.get('/down_hri2001', middleware.isLoggedIn, controller.dowloadCSV('hri_2001'))
        router.get('/down_hri2011', middleware.isLoggedIn, controller.dowloadCSV('hri_2011'))
        //Sales Downloads
        router.get('/down_sales', middleware.isLoggedIn, controller.dowloadCSV('sales'))
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
