const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    UUID: {type: String, required: true, index:true},
    Nickname: {type: String},
    Coins: {type: Number, default: 0},
    Tokens: {type: Number, default: 0},
    EXP: {type: Number, default: 0},
    Group: {type: Number, default: 0},
    paidAccount: {type: Boolean},
    specialPerms: {type: Array, default: {}},
    LastLogon: {type: Date, default: Date.now},
    LastLogout: {type: Date, default: Date.now},
    FirstLogon: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Users', userSchema);