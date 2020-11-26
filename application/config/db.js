const config = require('config'),
    mongoose = require('mongoose');

const dbConnect = config.get(`${process.env.NODE_ENV}.dbConfig.connect`);

mongoose.connect(
    `mongodb://${dbConnect}`,
    {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
    },
    err => {
        console.log(err);
    }
);

module.exports = mongoose;
