const {nc} = require("../../nats/natsClient")
const {JSONCodec} = require("nats");

const jc = JSONCodec();

//Pub/Sub Event name = RGC
exports.replaceGroupCache = (json) => {
    nc.publish("RGC", jc.encode(json));
}

//The client will have to store group cache and replace it.
//Admin has two choice to update group : 1. With a command, 2. From the DB and then run /sapi reload group