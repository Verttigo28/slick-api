const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    UUID: {type: String, required: true},
    Nickname: {type: String, required: true},
    Coins: {type: Number, default: 0, required: true},
    Tokens: {type: Number, default: 0, required: true},
    EXP: {type: Number, default: 0, required: true},
    Group: {type: Number, default: 0, required: true},
    paidAccount: {type: Boolean, required: true},
    LastLogon: {type: Date, default: Date.now},
    LastLogout: {type: Date, default: Date.now},
    FirstLogon: {type: Date, default: Date.now},
});

const User = mongoose.model('Users', userSchema);

module.exports = User;