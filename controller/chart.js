const State = require('../models/state');

const controller = {
    //SYNOPS
    synops(viewPath) {
        let func = function (req, res) {
            const params = {
                basis: [
                    { name: 'Basiszeitraum 1996-2005', value: 'synops-1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'synops-2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'synops-2011' },
                ],
                grps: ['Chemische Gruppen', 'Kulturgruppen', 'Wirkstoffe'].sort(),
                actGrps: ['Fungizide', 'Herbizide', 'Insektizide'].sort(),
                charts: [
                    'chart-bar-back1',
                    'chart-bar-back2',
                    'chart-bar-back3',
                    'chart-bar-back4',
                ],
                lines: [
                    { name: 'Basisjahr', color: '#b6b3b3' },
                    { name: 'NAP Ziel 2018', color: '#5576f0' },
                    { name: 'NAP Ziel 2023', color: '#04873f' },
                ],
            };

            res.render(`${viewPath}/synops`, {
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                lines: params.lines,
                state: req.savedState,
                page: 'synops',
                error: req.flash('error'),
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
                    { name: 'Basiszeitraum 1996-2005', value: 'pli-1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'pli-2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'pli-2011' },
                ],
                charts: ['chart-bar-back1', 'chart-bar-back2', 'chart-bar-back3'],
                lines: [{ name: 'Basisjahr', color: '#b6b3b3' }],
            };

            res.render(`${viewPath}/pli`, {
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                lines: params.lines,
                state: req.savedState,
                page: 'pli',
                error: req.flash('error'),
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
                    { name: 'Basiszeitraum 1996-2005', value: 'tli-1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'tli-2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'tli-2011' },
                ],
                charts: ['chart-bar-back1', 'chart-bar-back2', 'chart-bar-back3'],
                lines: [{ name: 'Basisjahr', color: '#b6b3b3' }],
            };

            res.render(`${viewPath}/tli`, {
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                lines: params.lines,
                state: req.savedState,
                page: 'tli',
                error: req.flash('error'),
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
                    { name: 'Basiszeitraum 1996-2005', value: 'pri-1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'pri-2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'pri-2011' },
                ],
                charts: ['chart-bar-back1', 'chart-bar-back2', 'chart-bar-back3'],
                lines: [{ name: 'Basisjahr', color: '#b6b3b3' }],
            };

            res.render(`${viewPath}/pri`, {
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                lines: params.lines,
                state: req.savedState,
                page: 'pri',
                error: req.flash('error'),
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
                    'Andere',
                    'Wachstumsregler',
                    'Fungizide',
                ].sort(),
                basis: [
                    { name: 'Basiszeitraum 1996-2005', value: 'hri-1996' },
                    { name: 'Basiszeitraum 2001-2010', value: 'hri-2001' },
                    { name: 'Basiszeitraum 2011-2013', value: 'hri-2011' },
                ],
                charts: ['chart-bar-back1'],
                lines: [{ name: 'Basisjahr', color: '#b6b3b3' }],
            };

            res.render(`${viewPath}/hri`, {
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                lines: params.lines,
                state: req.savedState,
                page: 'hri',
                error: req.flash('error'),
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
                    'Wachstumsregler',
                    'Fungizide',
                ].sort(),
                basis: [{ name: '---', value: 'sales-1996' }],
                charts: ['chart-bar-back1'],
                lines: [{ name: '', color: '' }],
            };

            res.render(`${viewPath}/sales`, {
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                lines: params.lines,
                state: req.savedState,
                page: 'sales',
                error: req.flash('error'),
            });
        };
        return func;
    },
};
module.exports = controller;
