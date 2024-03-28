const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    prefix: {type: String, required: true},
    suffix: {type: String, required: true},
    weight: {type: String, required: true},
    id: {type: Number, required: true},
    scoreboardId: {type: Number, required: true},
});

const Group = mongoose.model('Groups', groupSchema);

module.exports = Group;