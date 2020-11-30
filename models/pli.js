const mongoose = require('mongoose'),
    config = require('config');

const dataSchema = new mongoose.Schema(
    {
        grp: String,
        act_grp: String,
        sub_grp: String,
        year: Number,
        risk_ind: String,
        rel_value: Number,
    },
    {
        collection: config.get(
            `${process.env.NODE_ENV}.dbConfig.dataCollectionPLI`
        ),
    }
);

module.exports = mongoose.model('DataPLI', dataSchema);
