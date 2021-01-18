const express = require('express'),
    app = express();

const controller = {
    //Admin
    index(viewPath) {
        let func = function (req, res) {
            res.render(`${viewPath}/admin`, {
                page: 'admin',
                currentUser: req.user,
                success: req.flash('success'),
                error: req.flash('error'),
            });
        };
        return func;
    },

    //Admin Chart
    chart(viewPath) {
        let func = function (req, res) {
            let data = app.locals.userInput;

            let riskInd = [...new Set(data.map(item => item.risk_ind))];
            let charts = [];
            riskInd.forEach((risk, i) => {
                charts.push(`chart-bar-back${i + 1}`);
            });

            const params = {
                basis: [{ name: 'Admin', value: 'admin-2021' }],
                grps: [...new Set(data.map(item => item.grp))],
                actGrps: [...new Set(data.map(item => item.act_grp))],
                charts: charts,
            };

            res.render(`${viewPath}/adminChart`, {
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                lines: params.lines,
                state: req.savedState,
                page: 'adminChart',
                error: req.flash('error'),
            });
        };
        return func;
    },

    receiveData(req, res) {
        req.body.forEach(obj => (obj.year = +obj.year));
        req.body.forEach(obj => (obj.rel_value = +obj.rel_value));
        app.locals.userInput = req.body;
        res.redirect('/admin/chart');
    },

    sendRiskInd(req, res) {
        let arr = app.locals.userInput;
        let riskInd = [...new Set(arr.map(item => item.risk_ind))];
        res.json(riskInd)
    },

    sendSubgrps(req, res) {
        let arr = app.locals.userInput;
        let result = arr
            .filter(obj => obj.grp === req.query.grp)
            .filter(obj => obj.act_grp === req.query.act_grp);
        res.json(result);
    },

    sendData(req, res) {
        let arr = app.locals.userInput;
        let subGrps;
        if (!req.query.sub_grp) {
            subGrps = undefined;
        } else {
            subGrps = req.query.sub_grp.split(',');
            for (let i = 0; i < subGrps.length; i++) {
                subGrps[i] = subGrps[i].replace('XY', ',');
            }
        }

        let result = arr
            .filter(obj => obj.grp === req.query.grp)
            .filter(obj => obj.act_grp === req.query.act_grp)
            .filter(obj => subGrps.includes(obj.sub_grp));

        res.json(result);
    },
};

module.exports = controller;
