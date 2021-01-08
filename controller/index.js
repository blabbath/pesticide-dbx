const passport = require('passport'),
    Entities = require('html-entities').XmlEntities,
    striptags = require('striptags');
const User = require('../models/user');

const entities = new Entities();

const controller = {
    //INDEX
    index(viewPath) {
        let func = function (req, res) {
            res.render(`${viewPath}/index`, {
                page: 'index',
                currentUser: req.user,
                success: req.flash('success'),
                error: req.flash('error'),
            });
        };
        return func;
    },

    //REGISTER
    register(viewPath) {
        let func = function (req, res) {
            res.render(`${viewPath}/register`, {
                page: 'register',
                currentUser: req.user,
                error: req.flash('error'),
            });
        };
        return func;
    },

    registerPost(viewPath) {
        let func = function (req, res) {
            let username = req.body.username;
            if (username != striptags(username)) {
                req.flash('error', 'Invalid user name.');
                res.redirect('back');
                return;
            }
            let newUser = new User({ username: req.body.username });
            User.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    req.flash(
                        'error',
                        'Nutzername bereits vergeben. Bitte wählen sie einen anderen Namen.'
                    );
                    return res.render(`${viewPath}/register`, {
                        page: 'register',
                        currentUser: undefined,
                        error: req.flash('error'),
                    });
                }
                passport.authenticate('local')(req, res, () => {
                    req.flash(
                        'success',
                        `Nutzerkonto erfolgreich erstellt. Herzlich Willkommen ${entities.encode(
                            req.body.username
                        )}!`
                    );
                    res.redirect('./');
                });
            });
        };
        return func;
    },

    //LOGIN
    login(viewPath) {
        let func = function (req, res) {
            const error = req.flash().error || [];
            res.render(`${viewPath}/login`, {
                error: error,
                page: 'login',
                currentUser: req.user,
            });
        };
        return func;
    },

    loginAuthenticate: passport.authenticate('local', {
        failureRedirect: 'login',
        failureFlash: true,
    }),

    loginRedirect(req, res) {
        res.redirect('./');
    },

    //LOGOUT
    logout(req, res) {
        req.logout();
        res.redirect('./');
    },
};

module.exports = controller;
