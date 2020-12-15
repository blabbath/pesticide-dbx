const passport = require('passport');
const middleware = require('../middleware/index');
const User = require('../models/user');

const controller = {
    //INDEX
    index(viewPath) {
        let func = function (req, res) {
            res.render(`${viewPath}/index`, {
                page: 'index',
                currentUser: req.user,
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
                messages: req.flash('success'),
            });
        };
        return func;
    },

    registerPost(req, res) {
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
                });
            }
            passport.authenticate('local')(req, res, () => {
                req.flash('success', 'Nutzerkonto erfolgreich erstellt. Herzlich Willkommen');
                res.redirect('back');
            });
        });
    },

    //LOGIN
    login(viewPath) {
        let func = function (req, res) {
            const errors = req.flash().error || [];
            res.render(`${viewPath}/login`, {
                errors: errors,
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

    //DOWNLOADS
    downloads(viewPath) {
        let func = function (req, res) {
            res.render(`${viewPath}/downloads`, {
                page: 'downloads',
                currentUser: req.user,
            });
        };
        return func;
    },
};

module.exports = controller;
