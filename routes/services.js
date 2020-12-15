const express = require('express'),
    router = express.Router();
const controller = require('../controller/services');
const Synops1996 = require('../models/synops1996');
const Synops2001 = require('../models/synops2001');
const Synops2011 = require('../models/synops2011');
const PLI1996 = require('../models/pli1996');
const PLI2001 = require('../models/pli2001');
const PLI2011 = require('../models/pli2011');
const PRI1996 = require('../models/pri1996');
const PRI2001 = require('../models/pri2001');
const PRI2011 = require('../models/pri2011');
const TLI1996 = require('../models/tli1996');
const TLI2001 = require('../models/tli2001');
const TLI2011 = require('../models/tli2011');
const HRI1996 = require('../models/hri1996');
const HRI2001 = require('../models/hri2001');
const HRI2011 = require('../models/hri2011');
const Sales = require('../models/sales');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //SYNOPS
        router.get('/subgrps_synops1996', controller.subgroups(Synops1996));
        router.get('/subgrps_synops2001', controller.subgroups(Synops2001));
        router.get('/subgrps_synops2011', controller.subgroups(Synops2011));
        router.get('/visData_synops1996', controller.visData(Synops1996));
        router.get('/visData_synops2001', controller.visData(Synops2001));
        router.get('/visData_synops2011', controller.visData(Synops2011));
        //PLI
        router.get('/subgrps_pli1996', controller.subgroups(PLI1996));
        router.get('/subgrps_pli2001', controller.subgroups(PLI2001));
        router.get('/subgrps_pli2011', controller.subgroups(PLI2011));
        router.get('/visData_pli1996', controller.visData(PLI1996));
        router.get('/visData_pli2001', controller.visData(PLI2001));
        router.get('/visData_pli2011', controller.visData(PLI2011));
        //TLI
        router.get('/subgrps_tli1996', controller.subgroups(TLI1996));
        router.get('/subgrps_tli2001', controller.subgroups(TLI2001));
        router.get('/subgrps_tli2011', controller.subgroups(TLI2011));
        router.get('/visData_tli1996', controller.visData(TLI1996));
        router.get('/visData_tli2001', controller.visData(TLI2001));
        router.get('/visData_tli2011', controller.visData(TLI2011));
        //PRI
        router.get('/subgrps_pri1996', controller.subgroups(PRI1996));
        router.get('/subgrps_pri2001', controller.subgroups(PRI2001));
        router.get('/subgrps_pri2011', controller.subgroups(PRI2011));
        router.get('/visData_pri1996', controller.visData(PRI1996));
        router.get('/visData_pri2001', controller.visData(PRI2001));
        router.get('/visData_pri2011', controller.visData(PRI2011));
        //HRI
        router.get('/subgrps_hri1996', controller.subgroups(HRI1996));
        router.get('/subgrps_hri2001', controller.subgroups(HRI2001));
        router.get('/subgrps_hri2011', controller.subgroups(HRI2011));
        router.get('/visData_hri1996', controller.visData(HRI1996));
        router.get('/visData_hri2001', controller.visData(HRI2001));
        router.get('/visData_hri2011', controller.visData(HRI2011));
        //Sales
        router.get('/subgrps_sales', controller.subgroups(Sales));
        router.get('/visData_sales', controller.visData(Sales));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
