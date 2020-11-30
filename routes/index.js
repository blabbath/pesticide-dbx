const express = require('express'),
    router = express.Router();
const middleware = require('../middleware/index');
//const User = require('../models/user');

const controller = require('../controller/index');

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //Index
        router.get('/', controller.index(this.viewPath));
        //Register
        router.get('/register', controller.register(this.viewPath));

        router.post('/register', controller.registerPost);

        //Login
        router.get('/login', controller.login(this.viewPath));

        router.post(
            '/login',
            controller.loginAuthenticate,
            controller.loginRedirect
        );

        //Logout
        router.get('/logout', controller.logout);

        //Downloads
        router.get(
            '/downloads',
            middleware.isLoggedIn,
            controller.downloads(this.viewPath)
        );

        /*         //Get current user
        router.get('/user', middleware.isLoggedIn, (req, res) => {
            if (req.user === undefined) {
                res.send({});
            } else {
                res.send({
                    username: req.user.username,
                });
            }
        });

        //Create state
        router.post(
            ['/synops', '/sales', '/pli', '/pri', '/tli', '/hri'],
            middleware.isLoggedIn,
            (req, res) => {
                let date = new Date();
                let stateName = req.body.state.stateName;
                let grp = req.body.state.grp;
                let act_grp = req.body.state.act_grp;
                let sub_grp = req.body.state.sub_grp;
                let base = req.query.base;
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
                        res.redirect('state');
                    }
                });
            }
        );

        //Find all states of a user
        router.get('/state', middleware.isLoggedIn, (req, res) => {
            State.find({ 'user.id': req.user._id }, (err, state) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('state', {
                        state: state,
                        currentUser: req.user,
                        page: 'state',
                        messages: req.flash('success'),
                    });
                }
            });
        });

        //Delete state
        router.delete('/state/:id', middleware.checkOwnership, (req, res) => {
            State.findByIdAndRemove(req.params.id, err => {
                if (err) {
                    console.log(err);
                    res.redirect('back');
                } else {
                    res.redirect('back');
                }
            });
        }); */
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
