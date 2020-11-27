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

module.exports = middleware;
