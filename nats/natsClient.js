const {connect} = require("nats");

let nc;

exports.startNats = async () => {
    //nc = await connect({servers: process.env.nats_url*/, token: process.env.nats_token});
    nc = await connect({servers: process.env.nats_url})
        .catch((error) => console.log("Error : " + error))
        .then(() => console.log("Nats : Up and runing"));
}

exports.closeNATS = async () => {
    await nc.drain();
}
exports.nc = nc;

