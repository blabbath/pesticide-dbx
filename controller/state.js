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
        let date = new Date();
        let stateName = req.body['state[stateName]'];
        let grp = req.body['state[grp]'];
        let act_grp = req.body['state[act_grp]'];
        let sub_grp = req.body['state[sub_grp]'];
        let base = req.body['state[basis]'];
        let weight = req.body['state[weight]'] ? req.body['state[weight]'] : 'undefined' 
        let user = {
            id: req.user._id,
            username: req.user.username,
        };
        let state = {
            date: date,
            stateName: stateName,
            grp: grp,
            act_grp: act_grp,
            sub_grp: sub_grp,
            base: base,
            weight: weight,
            user: user,
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
