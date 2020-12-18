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
            let downloadLinks = [
                {
                    indicator: 'SYNOPS-Trend',
                    links: [
                        {
                            href: 'downloads/down_syn1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_syn2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_syn2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Pesticide Load Indicator',
                    links: [
                        {
                            href: 'downloads/down_pli1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_pli2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_pli2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Toxic Load Indicator',
                    links: [
                        {
                            href: 'downloads/down_tli1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_tli2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_tli2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Pesticide Risk Indicator',
                    links: [
                        {
                            href: 'downloads/down_pri1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_pri2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_pri2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Harmonized Risk Indicator',
                    links: [
                        {
                            href: 'downloads/down_hri1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_hri2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_hri2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Absatzzahlen',
                    links: [{ href: 'downloads/down_sales', name: ' Absolute Werte (t/Jahr)' }],
                },
            ];

            res.render(`${viewPath}/downloads`, {
                download: downloadLinks,
                page: 'downloads',
                currentUser: req.user,
            });
        };
        return func;
    },
};

module.exports = controller;
