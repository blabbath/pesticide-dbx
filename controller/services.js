/* 
routes.forEach(e => {
    router.get(e.dataEndpoint, (req, res) => {
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

        e.model.find(refQuery, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                res.json(response);
            }
        });
    });
});

module.exports = router; */

const subgroups = function (model) {
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
};

module.exports = { subgroups };
