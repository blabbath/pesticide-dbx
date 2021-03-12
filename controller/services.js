const util = require('util');

const filterIndicator = function (filter, array) {
    let result;
    if (filter === 'total') {
        result = array.filter(
            item =>
                !item.risk_ind.toLowerCase().includes('environment') &&
                !item.risk_ind.toLowerCase().includes('human')
        );
    } else if (filter === 'human') {
        result = array.filter(item => item.risk_ind.toLowerCase().includes('human'));
    } else if (filter === 'environment') {
        result = array.filter(item => item.risk_ind.toLowerCase().includes('environment'));
    }
    return result;
};

const findSubGprs = function (query) {
    let subGrps;
    if (!query.sub_grp) {
        subGrps = undefined;
    } else {
        subGrps = query.sub_grp.split(',');
        for (let i = 0; i < subGrps.length; i++) {
            subGrps[i] = subGrps[i].replace('XY', ',');
        }
    }
    return subGrps;
};

const prepareQuery = function (req, models) {
    let prm = {};
    prm.indicatorA = req.query.indicatorA.split('-')[0];
    prm.indicatorB = req.query.indicatorB.split('-')[0];
    prm.filter = req.query.indicatorA.split('-')[1];
    prm.modelA = models[prm.indicatorA.toUpperCase()];
    prm.modelB = models[prm.indicatorB.toUpperCase()];
    req.query.hasOwnProperty('indicatorA') ? delete req.query.indicatorA : false;
    req.query.hasOwnProperty('indicatorB') ? delete req.query.indicatorB : false;
    prm.query = req.query;
    return prm;
};

const createQueries = function (prm) {
    let q = {};
    q.queryA = { ...prm.query };
    q.queryB = { ...prm.query };
    return q;
};

const createCompareResponse = function (responseA, responseB, prm) {
    responseA = filterIndicator(prm.filter, responseA);
    responseB = filterIndicator(prm.filter, responseB);

    responseA.forEach(e => {
        e.risk_ind = 'figureA';
        e.indicator = prm.indicatorA;
    });
    responseB.forEach(e => {
        e.risk_ind = 'figureB';
        e.indicator = prm.indicatorB;
    });
    
    const response = [...responseA, ...responseB];
    return response;
};

const controller = {
    subgroups(model) {
        let func = function (req, res, next) {
            const query = req.query;
            if (!query.weight || query.weight === 'undefined') {
                delete query.weight;
            }
            model.find(query, (err, subgrps) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(subgrps);
                }
            });
        };
        return func;
    },

    visData(model) {
        let func = function (req, res) {
            let query = req.query;
            let refQuery = {};

            let subGrps = findSubGprs(query);

            refQuery.grp = query.grp;
            refQuery.act_grp = query.act_grp;
            refQuery.sub_grp = subGrps;
            refQuery.base = query.base;
            if (query.weight !== 'undefined') {
                refQuery.weight = query.weight;
            }

            model.find(refQuery, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(response);
                }
            });
        };
        return func;
    },

    compare_subgrps(models) {
        let func = function (req, res, next) {
            let prm = prepareQuery(req, models);
            let q = createQueries(prm);

            prm.modelA.find(q.queryA, (err, subgrpsA) => {
                if (err) {
                    console.log(err);
                } else {
                    prm.modelB.find(q.queryB, (err, subgrpsB) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const subgrps = createCompareResponse(subgrpsA, subgrpsB, prm);

                            res.json(subgrps);
                        }
                    });
                }
            });
        };
        return func;
    },

    compare_data(models) {
        let func = function (req, res) {
            let prm = prepareQuery(req, models);
            let subGrps = findSubGprs(req.query);

            prm.query.grp = req.query.grp;
            prm.query.act_grp = req.query.act_grp;
            prm.query.sub_grp = subGrps;
            prm.query.base = req.query.base;

            let q = createQueries(prm);

            prm.modelA.find(q.queryA, (err, responseA) => {
                if (err) {
                    console.log(err);
                } else {
                    prm.modelB.find(q.queryB, (err, responseB) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const response = createCompareResponse(responseA, responseB, prm);
                            res.json(response);
                        }
                    });
                }
            });
        };
        return func;
    },
};

module.exports = controller;
