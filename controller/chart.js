const State = require('../models/state');

const controller = {
    //SYNOPS
    synops(viewPath) {
        let func = function (req, res) {
            const params = {
                basis: [
                    { name: 'Basiszeitraum 1996-2005', value: 'synops1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'synops2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'synops2011' },
                ],
                grps: ['Chemische Gruppen', 'Kulturgruppen', 'Wirkstoffe'].sort(),
                actGrps: ['Fungizide', 'Herbizide', 'Insektizide'].sort(),
                charts: [
                    'chart-bar-back1',
                    'chart-bar-back2',
                    'chart-bar-back3',
                    'chart-bar-back4',
                ],
            };

            res.render(`${viewPath}/synops`, {
                basis: params.basis,
                grps: params.grps,
                actGrps: params.actGrps,
                charts: params.charts,
                currentUser: req.user,
                page: 'synops',
                errors: req.flash('error'),
                success: req.flash('success'),
                baseUrl: req.app.locals.baseUrl,
            });
        };
        return func;
    },

    //PLI
    pli(viewPath) {
        let func = function (req, res) {
            const params = {
                grps: ['Chemische Gruppen', 'Wirkstoffe'].sort(),
                actGrps: [
                    'Herbizide',
                    'Insektizide',
                    'Andere',
                    'Wachstumsregler',
                    'Fungizide',
                ].sort(),
                basis: [
                    { name: 'Basiszeitraum 1996-2005', value: 'pli1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'pli2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'pli2011' },
                ],
                charts: ['chart-bar-back1', 'chart-bar-back2', 'chart-bar-back3'],
            };

            res.render(`${viewPath}/pli`, {
                basis: params.basis,
                grps: params.grps,
                actGrps: params.actGrps,
                charts: params.charts,
                currentUser: req.user,
                page: 'pli',
                errors: req.flash('error'),
                success: req.flash('success'),
                baseUrl: req.app.locals.baseUrl,
            });
        };
        return func;
    },

    //TLI
    tli(viewPath) {
        let func = function (req, res) {
            const params = {
                grps: ['Chemische Gruppen', 'Wirkstoffe'].sort(),
                actGrps: [
                    'Herbizide',
                    'Insektizide',
                    'Andere',
                    'Wachstumsregler',
                    'Fungizide',
                ].sort(),
                basis: [
                    { name: 'Basiszeitraum 1996-2005', value: 'tli1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'tli2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'tli2011' },
                ],
                charts: ['chart-bar-back1', 'chart-bar-back2', 'chart-bar-back3'],
            };

            res.render(`${viewPath}/tli`, {
                basis: params.basis,
                grps: params.grps,
                actGrps: params.actGrps,
                charts: params.charts,
                currentUser: req.user,
                page: 'tli',
                errors: req.flash('error'),
                success: req.flash('success'),
                baseUrl: req.app.locals.baseUrl,
            });
        };
        return func;
    },

    //PRI
    pri(viewPath) {
        let func = function (req, res) {
            const params = {
                grps: ['Chemische Gruppen', 'Wirkstoffe'].sort(),
                actGrps: [
                    'Herbizide',
                    'Insektizide',
                    'Andere',
                    'Wachstumsregler',
                    'Fungizide',
                ].sort(),
                basis: [
                    { name: 'Basiszeitraum 1996-2005', value: 'pri1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'pri2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'pri2011' },
                ],
                charts: ['chart-bar-back1', 'chart-bar-back2', 'chart-bar-back3'],
            };

            res.render(`${viewPath}/pri`, {
                basis: params.basis,
                grps: params.grps,
                actGrps: params.actGrps,
                charts: params.charts,
                currentUser: req.user,
                page: 'pri',
                errors: req.flash('error'),
                success: req.flash('success'),
                baseUrl: req.app.locals.baseUrl,
            });
        };
        return func;
    },

    //HRI
    hri(viewPath) {
        let func = function (req, res) {
            const params = {
                grps: ['Chemische Gruppen', 'Wirkstoffe'].sort(),
                actGrps: [
                    'Herbizide',
                    'Insektizide',
                    /* 'Andere', */
                    'Wachstumsregler',
                    'Fungizide',
                ].sort(),
                basis: [
                    { name: 'Basiszeitraum 1996-2005', value: 'hri1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'hri2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'hri2011' },
                ],
                charts: ['chart-bar-back1'],
            };

            res.render(`${viewPath}/hri`, {
                basis: params.basis,
                grps: params.grps,
                actGrps: params.actGrps,
                charts: params.charts,
                currentUser: req.user,
                page: 'hri',
                errors: req.flash('error'),
                success: req.flash('success'),
                baseUrl: req.app.locals.baseUrl,
            });
        };
        return func;
    },

    //SALES
    sales(viewPath) {
        let func = function (req, res) {
            const params = {
                grps: ['Chemische Gruppen', 'Wirkstoffe'].sort(),
                actGrps: [
                    'Herbizide',
                    'Insektizide',
                    /* 'Andere', */
                    'Wachstumsregler',
                    'Fungizide',
                ].sort(),
                basis: [{ name: '---', value: 'sales' }],
                charts: ['chart-bar-back1'],
            };

            res.render(`${viewPath}/sales`, {
                basis: params.basis,
                grps: params.grps,
                actGrps: params.actGrps,
                charts: params.charts,
                currentUser: req.user,
                page: 'sales',
                errors: req.flash('error'),
                success: req.flash('success'),
                baseUrl: req.app.locals.baseUrl,
            });
        };
        return func;
    },
};
module.exports = controller;
