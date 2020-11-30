const mongoose = require('mongoose'),
    config = require('config');

const dataSchema = new mongoose.Schema(
    {
        grp: String,
        act_grp: String,
        sub_grp: String,
        year: Number,
        risk_ind: {
            type: String,
            default: 'Harmonized Risk Indicator',
        },
        rel_value: Number,
    },
    {
        collection: config.get(
            `${process.env.NODE_ENV}.dbConfig.dataCollectionHRI`
        ),
    }
);

module.exports = mongoose.model('DataHRI', dataSchema);
