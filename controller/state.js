const State = require('../models/state');

const controller = {
    //STATE
    state(viewPath) {
        let func = function (req, res) {
            State.find({ 'user.id': req.user._id }, (err, state) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render(`${viewPath}/state`, {
                        state: state,
                        currentUser: req.user,
                        page: 'state',
                        success: req.flash('success'),
                    });
                }
            });
        };
        return func;
    },

    //GET CURRENT USERNAME
    currentUser(req, res) {
        if (req.user === undefined) {
            res.send(undefined);
        } else {
            res.send({
                username: req.user.username,
            });
        }
    },

    //CREATE STATE
    stateCreate(req, res) {
        let keys = ['date', 'stateName', 'grp', 'act_grp', 'sub_grp', 'base', 'weight', 'user'];

        let state = {
            date: new Date(),
            stateName: req.body.state.stateName,
            grp: req.body.state.grp,
            act_grp: req.body.state.act_grp,
            sub_grp: req.body.state.sub_grp,
            base: req.body.state.basis,
            weight: req.body.state.weight ? req.body.state.weight : 'undefined',
            user: {
                id: req.user._id,
                username: req.user.username,
            },
        };

        if(!keys.every(key => Object.keys(state).includes(key))) {
            req.flash(
                'error',
                'Zustand der Grafik konnte nicht gespeichert werden. Wir beheben das Problem schnellstmöglich.'
            );
            res.redirect('back');
        };

        State.create(state, (err, state) => {
            if (err) {
                console.log(err.message);
                req.flash(
                    'error',
                    'Name bereits vergeben. Zustand der Grafik konnte nicht gespeichert werden.'
                );
                res.redirect('back');
            } else {
                req.flash('success', 'Zustand der Grafik erfolgreich gespeichert!');
                res.redirect('./');
            }
        });
    },

    //DELETE STATE
    stateDelete(req, res) {
        State.findByIdAndRemove(req.params.id, err => {
            if (err) {
                console.log(err);
                res.redirect('back');
            } else {
                res.redirect('back');
            }
        });
    },
};

module.exports = controller;
