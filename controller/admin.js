const express = require('express'),
    app = express();

const controller = {
    //Admin
    index(viewPath) {
        let func = function (req, res) {
            res.render(`${viewPath}/admin`, {
                page: 'admin',
                currentUser: req.user,
                success: req.flash('success'),
                error: req.flash('error'),
            });
        };
        return func;
    },
};

module.exports = controller;
