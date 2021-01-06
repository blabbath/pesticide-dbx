const controller = {
    subgroups(model) {
        let func = function (req, res) {
            const query = req.query;
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
            refQuery.base = query.base

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
};

module.exports = controller;
