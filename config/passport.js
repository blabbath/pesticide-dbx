const LocalStrategy = require('passport-local'),
    config = require('config'),
    User = require('../models/user');

module.exports = (app, passport) => {
    app.use(
        require('express-session')({
            secret: config.get(`${process.env.NODE_ENV}.authConfig.secret`),
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
