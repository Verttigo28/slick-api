const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    id: {type: Number, required: true, index:true},
    prefix: {type: String, required: true},
    suffix: {type: String, required: true},
    weight: {type: String, required: true},
    permissions: {type: Array, default: {}},
});

const Group = mongoose.model('Groups', groupSchema);

module.exports = Group;