const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    date: Date,
    stateName: String,
    grp: String,
    act_grp: String,
    sub_grp: Array,
    base: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    },
});

module.exports = mongoose.model('State', stateSchema);
