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

            let subGrps;
            if (!query.sub_grp) {
                subGrps = undefined;
            } else {
                subGrps = query.sub_grp.split(',');
                for (let i = 0; i < subGrps.length; i++) {
                    subGrps[i] = subGrps[i].replace('XY', ',');
                }
            }

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
            let indicatorA = req.query.indicatorA.split('-')[0];
            let indicatorB = req.query.indicatorB.split('-')[0];
            let filter = req.query.indicatorA.split('-')[1];
            let modelA = models[indicatorA.toUpperCase()];
            let modelB = models[indicatorB.toUpperCase()];

            const query = req.query;

            if (!query.weight || query.weight === 'undefined') {
                delete query.weight;
            }

            delete query.indicatorA;
            delete query.indicatorB;
            let queryA = { ...query };
            let queryB = { ...query };

            queryA.json_featuretype = indicatorA;
            queryB.json_featuretype = indicatorB;

            modelA.find(queryA, (err, subgrpsA) => {
                if (err) {
                    console.log(err);
                } else {
                    modelB.find(queryB, (err, subgrpsB) => {
                        if (err) {
                            console.log(err);
                        } else {
                            subgrpsA = filterIndicator(filter, subgrpsA)
                            subgrpsB = filterIndicator(filter, subgrpsB)

                            subgrpsA.forEach(e => (e.risk_ind = 'Abbildung A'));
                            subgrpsB.forEach(e => (e.risk_ind = 'Abbildung B'));
                            const subgrps = [...subgrpsA, ...subgrpsB];
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
            let query = req.query;
            let refQuery = {};
            let indicatorA = req.query.indicatorA.split('-')[0];
            let indicatorB = req.query.indicatorB.split('-')[0];
            let filter = req.query.indicatorA.split('-')[1];
            let modelA = models[indicatorA.toUpperCase()];
            let modelB = models[indicatorB.toUpperCase()];

            let subGrps;
            if (!query.sub_grp) {
                subGrps = undefined;
            } else {
                subGrps = query.sub_grp.split(',');
                for (let i = 0; i < subGrps.length; i++) {
                    subGrps[i] = subGrps[i].replace('XY', ',');
                }
            }

            refQuery.grp = query.grp;
            refQuery.act_grp = query.act_grp;
            refQuery.sub_grp = subGrps;
            refQuery.base = query.base;
/*             if (query.weight !== 'undefined' || query.weight !== undefined) {
                refQuery.weight = query.weight;
            } */
            delete refQuery.indicatorA;
            delete refQuery.indicatorB;
            let refQueryA = { ...refQuery };
            let refQueryB = { ...refQuery };

            refQueryA.json_featuretype = indicatorA;
            refQueryB.json_featuretype = indicatorB;

            modelA.find(refQueryA, (err, responseA) => {
                if (err) {
                    console.log(err);
                } else {
                    modelB.find(refQueryB, (err, responseB) => {
                        if (err) {
                            console.log(err);
                        } else {
                            responseA = filterIndicator(filter, responseA)
                            responseB = filterIndicator(filter, responseB)

                            responseA.forEach(e => (e.risk_ind = 'Abbildung A'));
                            responseB.forEach(e => (e.risk_ind = 'Abbildung B'));
                            const response = [...responseA, ...responseB];
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
