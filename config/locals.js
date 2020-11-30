const express = require('express'),
    app = express(),
    config = require('config');

app.locals.defaultStateSYNOPS = { grp: 'Kulturgruppen', act_grp: 'Herbizide' };
app.locals.defaultState = {
    grp: 'Chemische Gruppen',
    act_grp: 'Herbizide',
};

app.locals.baseUrl = config.get(`${process.env.NODE_ENV}.appConfig.baseUrl`);

module.exports = app.locals;
