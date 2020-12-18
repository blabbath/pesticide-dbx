const controller = {
    //DOWNLOADS
    downloads(viewPath) {
        let func = function (req, res) {
            let downloadLinks = [
                {
                    indicator: 'SYNOPS-Trend',
                    links: [
                        {
                            href: 'downloads/down_syn1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_syn2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_syn2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Pesticide Load Indicator',
                    links: [
                        {
                            href: 'downloads/down_pli1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_pli2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_pli2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Toxic Load Indicator',
                    links: [
                        {
                            href: 'downloads/down_tli1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_tli2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_tli2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Pesticide Risk Indicator',
                    links: [
                        {
                            href: 'downloads/down_pri1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_pri2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_pri2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Harmonized Risk Indicator',
                    links: [
                        {
                            href: 'downloads/down_hri1996',
                            name: 'Basiszeitraum 1996-2005',
                        },
                        {
                            href: 'downloads/down_hri2001',
                            name: 'Basiszeitraum 2001-2010',
                        },
                        {
                            href: 'downloads/down_hri2011',
                            name: 'Basiszeitraum 2011-2013',
                        },
                    ],
                },
                {
                    indicator: 'Absatzzahlen',
                    links: [{ href: 'downloads/down_sales', name: ' Absolute Werte (t/Jahr)' }],
                },
            ];

            res.render(`${viewPath}/downloads`, {
                download: downloadLinks,
                page: 'downloads',
                currentUser: req.user,
            });
        };
        return func;
    },

    dowloadCSV(filename) {
        let func = function (req, res) {
            let filePath = `./uploads/${filename}.csv`;
            let fileName = `${filename}.csv`;
            res.download(filePath, fileName);
        };
        return func;
    },
};

module.exports = controller; //TODO add downloads route
