const State = require('../models/state');
let middleware = {};

middleware.checkOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        State.findById(req.params.id, (err, foundState) => {
            if (err) {
                res.redirect('back');
            } else {
                if (foundState.user.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash(
        'error',
        'Sie sind derzeit nicht eingelogged. Bitte loggen sie sich ein oder erstellen ein Nutzerkonto.'
    );
    res.redirect('./');
};

middleware.getSavedState = function (req, res, next) {
    let id = req.query.id;
    let defaultState = req.app.locals.defaultStateSYNOPS;
    if (req.isAuthenticated()) {
        State.findById(id, (err, foundState) => {
            if (err) {
                console.log(err);
            } else {
                if (foundState) {
                    if (foundState.user.id.equals(req.user._id)) {
                        req.savedState = foundState;
                        next();
                    } else if (!foundState.user.id.equals(req.user._id)) {
                        req.flash(
                            'error',
                            'You are not permitted to see the requested saved State.'
                        );
                        req.savedState = defaultState;
                        next();
                    }
                } else {
                    req.savedState = defaultState;
                    next();
                }
            }
        });
    } else if (req.originalUrl.includes('?')) {
        req.flash(
            'error',
            'You are not permitted to see the requested saved State. Please log in to the correct user account.'
        );
        req.savedState = defaultState;
        next();
    } else {
        req.savedState = defaultState;
        next();
    }
};

/* middleware.getSavedState = function (req, res, next) {
    let id = req.query.id;
    let defaultState = req.app.locals.defaultStateSYNOPS;
    if (req.isAuthenticated()) {
        State.findById(id, (err, foundState) => {
            if (err) {
                console.log(err);
            } else if (foundState) {
                if (foundState.user.id.equals(req.user._id)) {
                    req.savedState = foundState;
                    next();
                }
            }
        });
    }
    req.savedState = defaultState;
    next();
}; */

module.exports = middleware;
