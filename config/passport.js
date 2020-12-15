const LocalStrategy = require('passport-local'),
    config = require('config'),
    session = require('express-session');
MongoStore = require('connect-mongo')(session);
User = require('../models/user');

const dbConnect = config.get(`${process.env.NODE_ENV}.dbConfig.connect`);
module.exports = (app, passport) => {
    app.use(
        session({
            store: new MongoStore({
                url: `mongodb://${dbConnect}`,
                ttl: 7 * 24 * 60 * 60, // = 7 days
            }),
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
