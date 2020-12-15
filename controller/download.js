const controller = {
    //DOWNLOADS
    downloads(viewPath) {
        let func = function (req, res) {
            res.render(`${viewPath}/`, {
                page: 'downloads',
                currentUser: req.user,
            });
        };
        return func;

        //TODO add downloads routes and create csv files
    }
};

module.exports = controller;//TODO add downloads route