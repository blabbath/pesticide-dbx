const express = require('express'),
    router = express.Router();
const controller = require('../controller/services');
const Synops1996 = require('../models/synops1996');
const Synops2001 = require('../models/synops2001');
const Synops2011 = require('../models/synops2011');
const Sales = require('../models/sales');
const HRI = require('../models/hri');
const PLI = require('../models/pli');
const TLI = require('../models/tli');
const PRI = require('../models/pri');
const synops2001 = require('../models/synops2001');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //SYNOPS
        router.get('/subgrps_synops1996', controller.subgroups(Synops1996));
        router.get('/subgrps_synops2001', controller.subgroups(Synops2001));
        router.get('/subgrps_synops2011', controller.subgroups(Synops2011));
        //PLI
        router.get('/pli', (req, res) => res.send('pli'));
        //PRI
        router.get('/pri', (req, res) => res.send('pri'));
        //TLI
        router.get('/tli', (req, res) => res.send('pli'));
        //HRI
        router.get('/hri', (req, res) => res.send('hri'));
        //Sales
        router.get('/sales', (req, res) => res.send('sales'));
    }

    getRoutes() {
        return router;
    }
}
module.exports = projectRouter;
