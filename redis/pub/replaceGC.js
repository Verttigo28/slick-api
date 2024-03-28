const {publisher} = require("../redisClient")

//Pub/Sub Event name = RGC
exports.replaceGroupCache = (json) => {
    publisher.publish("RGC", json);
}

//The client will have to store group cache and replace it.
//Admin has two choice to update group : 1. With a command, 2. From the DB and then run /sapi reload group