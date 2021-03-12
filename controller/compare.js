const controller = {
    //INDEX
    index(viewPath) {
        let func = function (req, res) {
            const params = {
                basis: [
                    { name: '1996-2005', value: '1996' },
                    { name: '2001-2010', value: '2001' },
                    { name: '2011-2013', value: '2011' },
                ],
                grps: ['Chemische Gruppen', 'Wirkstoffe'].sort(),
                actGrps: [
                    'Herbizide',
                    'Insektizide',
                    'Andere',
                    'Wachstumsregler',
                    'Fungizide',
                    'alle PSM',
                ].sort(),
                charts: [
                    'chart-bar-back1',
                    'chart-bar-back2',
                    'chart-scatter-1',
                    /* 'chart-scatter-2', */
                ],
                indicator: [
                    { name: 'PLI', value: 'pli-total', group: 'total' },
                    { name: 'PLI Human', value: 'pli-human', group: 'human' },
                    { name: 'PLI Environment', value: 'pli-environment', group: 'environment' },
                    { name: 'TLI', value: 'tli-total', group: 'total' },
                    { name: 'TLI Human', value: 'tli-human', group: 'human' },
                    { name: 'TLI Environment', value: 'tli-environment', group: 'environment' },
                    { name: 'PRI', value: 'pri-total', group: 'total' },
                    { name: 'PRI Human', value: 'pri-human', group: 'human' },
                    { name: 'PRI Environment', value: 'pri-environment', group: 'environment' },
                    { name: 'HRI', value: 'hri-total', group: 'total' },
                ],
            };
            res.render(`${viewPath}/compare`, {
                page: 'compare',
                grps: params.grps,
                actGrps: params.actGrps,
                basis: params.basis,
                currentUser: req.user,
                charts: params.charts,
                currentUser: req.user,
                indicator: params.indicator,
            });
        };
        return func;
    },
};

module.exports = controller;
