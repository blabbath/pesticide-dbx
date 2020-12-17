const passport = require('passport');
const middleware = require('../middleware/index');
const User = require('../models/user');
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
                        messages: req.flash('success'),
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
            user: user,
        };

        State.create(state, (err, state) => {
            if (err) {
                console.log(err.message);
                req.flash(
                    'error',
                    'Name bereits vergeben. Zustand konnte nicht gespeichert werden.'
                );
                res.redirect('back');
            } else {
                req.flash('success', 'Zustand der Grafik gespeichert!');
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
