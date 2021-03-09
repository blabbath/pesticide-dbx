const express = require('express'),
    router = express.Router();
const controller = require('../controller/services');
const Synops = require('../models/synops-trend');
const PLI = require('../models/pli');
const PRI = require('../models/pri');
const TLI = require('../models/tli');
const HRI = require('../models/hri');
const SALES = require('../models/sales');
const models = {PLI, PRI, TLI, HRI, SALES}
class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //SYNOPS
        router.get('/subgrps_synops', controller.subgroups(Synops));
        router.get('/visData_synops', controller.visData(Synops));
        //PLI
        router.get('/subgrps_pli', controller.subgroups(PLI));
        router.get('/visData_pli', controller.visData(PLI));
        //TLI
        router.get('/subgrps_tli', controller.subgroups(TLI));
        router.get('/visData_tli', controller.visData(TLI));
        //PRI
        router.get('/subgrps_pri', controller.subgroups(PRI));
        router.get('/visData_pri', controller.visData(PRI));
        //HRI
        router.get('/subgrps_hri', controller.subgroups(HRI));
        router.get('/visData_hri', controller.visData(HRI));
        //SALES
        router.get('/subgrps_sales', controller.subgroups(SALES));
        router.get('/visData_sales', controller.visData(SALES));
        //COMPARE
        router.get('/compare_subgrps', controller.compare_subgrps(models))
        router.get('/compare_data', controller.compare_data(models))
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
