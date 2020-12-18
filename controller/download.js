const controller = {
    dowloadCSV(filename) {
        let func = function (req, res) {
            let filePath = `./uploads/${filename}.csv`;
            let fileName = `${filename}.csv`;
            res.download(filePath, fileName);
        }
        return func
    }
};

module.exports = controller; //TODO add downloads route
