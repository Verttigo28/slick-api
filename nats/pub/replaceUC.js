const {nc} = require("../../nats/natsClient")
const {JSONCodec} = require("nats");

const jc = JSONCodec();

//Pub/Sub Event name = RUC
exports.replaceUserCache = (json) => {
    nc.publish("RUC", jc.encode(json));
}

//The client will have to store user cache and replace it.
//If client has the user in cache, update it.
//Admin has two choice to update group : 1. With a command, 2. From the DB and then run /sapi reload group