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
          res.send('hello')
            res.download(filePath, fileName);
        }
        return func
    }
};

module.exports = controller; //TODO add downloads route
