const State = require('../models/state')

const controller = {
    //SYNOPS
    synops(viewPath) {
        let func = function (req, res) {
            let id = req.query.id;
            let base = req.query.base;
            const grps = [
                'Chemische Gruppen',
                'Kulturgruppen',
                'Wirkstoffe',
            ].sort();
            const actGrps = ['Fungizide', 'Herbizide', 'Insektizide'].sort();
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
                    grps: grps,
                    actGrps: actGrps,
                    base: base,
                    currentUser: req.user,
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
};
module.exports = controller;
