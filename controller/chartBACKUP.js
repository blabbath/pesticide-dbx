const State = require('../models/state');

const controller = {
    //SYNOPS
    synops(viewPath) {
        let func = function (req, res) {
            let id = req.query.id;
            let base = req.query.base;
            const grps = ['Chemische Gruppen', 'Kulturgruppen', 'Wirkstoffe'].sort();
            const actGrps = ['Fungizide', 'Herbizide', 'Insektizide'].sort();
            const basis = [
                { name: 'Basiszeitraum 1996-2005', value: 'synops1996' },
                { name: 'Basiszeitraum 2001-2010', value: 'synops2001' },
                { name: 'Basiszeitraum 2011-2013', value: 'synops2011' },
            ];
            const charts = [
                'chart-bar-back1',
                'chart-bar-back2',
                'chart-bar-back3',
                'chart-bar-back4',
            ];
            let state = {};
            let defaultState = req.app.locals.defaultStateSYNOPS;

            State.findById(id, (err, foundState) => {
                if (err) {
                    console.log(err);
                } else {
                    if (req.isAuthenticated()) {
                        if (foundState === null) {
                            state = defaultState;
                        } else if (foundState.user.id.equals(req.user._id)) {
                            state = foundState;
                        } else if (!foundState.user.id.equals(req.user._id)) {
                            state = defaultState;
                        }
                    } else {
                        state = defaultState;
                    }
                }

                res.render(`${viewPath}/synops`, {
                    basis: basis,
                    grps: grps,
                    actGrps: actGrps,
                    base: base,
                    currentUser: req.user,
                    charts: charts,
                    state: state,
                    page: 'synops',
                    errors: req.flash('error'),
                    success: req.flash('success'),
                    baseUrl: req.app.locals.baseUrl,
                });
            });
        };
        return func;
    },

    sales(viewPath) {
        let func = function (req, res) {
            let id = req.query.id;
            let base = req.query.base;
            const grps = ['Chemische Gruppen', 'Wirkstoffe'].sort();
            const actGrps = [
                'Herbizide',
                'Insektizide',
                'Andere',
                'Wachstumsregler',
                'Fungizide',
            ].sort();
            const basis = [{ name: '---', value: 'sales' }];
            const charts = ['chart-bar-back1'];
            let state = {};
            let defaultState = req.app.locals.defaultState;

            State.findById(id, (err, foundState) => {
                if (err) {
                    console.log(err);
                } else {
                    if (req.isAuthenticated()) {
                        if (foundState === null) {
                            state = defaultState;
                        } else if (foundState.user.id.equals(req.user._id)) {
                            state = foundState;
                        } else if (!foundState.user.id.equals(req.user._id)) {
                            state = defaultState;
                        }
                    } else {
                        state = defaultState;
                    }
                }

                res.render(`${viewPath}/sales`, {
                    grps: grps,
                    actGrps: actGrps,
                    basis: basis,
                    base: base,
                    currentUser: req.user,
                    charts: charts,
                    state: state,
                    page: 'sales',
                    errors: req.flash('error'),
                    success: req.flash('success'),
                    baseUrl: req.app.locals.baseUrl,
                });
            });
        };
        return func;
    },
};
module.exports = controller;
