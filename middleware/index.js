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
    res.redirect('./');
};

middleware.getSavedState = function (req, res, next) {
    let id = req.query.id;
    let defaultState = req.app.locals.defaultStateSYNOPS;
    State.findById(id, (err, foundState) => {
        if (err) {
            console.log(err);
        } else {
            if (req.isAuthenticated()) {
                if (foundState === null) {
                    req.savedState = defaultState;
                    next()
                } else if (foundState.user.id.equals(req.user._id)) {
                    req.savedState = foundState;
                    next()
                } else if (!foundState.user.id.equals(req.user._id)) {
                    req.savedState = defaultState;
                    next()
                }
            } else {
                req.savedState = defaultState;
                next()

            }
        }
    })
}

module.exports = middleware;
