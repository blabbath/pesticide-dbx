const express = require('express'),
    router = express.Router(),
    passport = require('passport');
const middleware = require('../middleware/index')
const User = require('../models/user')

class projectRouter {
    constructor(viewPath) {
        this.viewPath = viewPath;
    }

    setRoutes() {
        //Index
        router.get('/', (req, res) => {
            res.render(`${this.viewPath}/index`, {
                page: 'index',
                currentUser: req.user,
            });
        });
        //Register
        router.get('/register', (req, res) => {
            res.render('register', {
                page: 'register',
                currentUser: req.user,
                messages: req.flash('success'),
                baseUrl: req.app.locals.baseUrl,
            });
        });

        router.post('/register', (req, res) => {
            let newUser = new User({ username: req.body.username });
            User.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    req.flash(
                        'error',
                        'Name bereits vergeben. Bitte wählen sie einen anderen Nutzernamen.'
                    );
                    return res.render('register', {
                        page: 'register',
                        currentUser: undefined,
                        messages: req.flash('error'),
                        baseUrl: req.app.locals.baseUrl,
                    });
                }
                passport.authenticate('local')(req, res, () => {
                    req.flash(
                        'success',
                        'Nutzerkonto erfolgreich erstellt. Herzlich Willkommen'
                    );
                    res.redirect('back');
                });
            });
        });

        //Login
        router.get('/login', (req, res) => {
            const errors = req.flash().error || [];
            res.render('login', {
                errors: errors,
                page: 'login',
                currentUser: req.user,
            });
        });

        router.post(
            '/login',
            passport.authenticate('local', {
                //TODO Dynamic routing to the last visited index
                failureRedirect: 'login',
                failureFlash: true,
            }),
            (req, res) => {
                const base = req.query.base;
                if (!base) {
                    res.redirect('./');
                } else if (base.includes('sales')) {
                    res.redirect(`sales?base=${base}`);
                } else if (base.includes('synops')) {
                    res.redirect(`synops?base=${base}`);
                } else {
                    res.redirect('./');
                }
            }
        );

        //Logout
        router.get('/logout', (req, res) => {
            req.logout();
            res.redirect('./');
        });

        //Get current user
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
        });
    }

    getRoutes() {
        return router;
    }
}

module.exports = projectRouter;
