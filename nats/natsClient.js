const {connect, JSONCodec} = require("nats");

const nc = await connect({servers: process.env.nats_url});

exports.nc = nc;
exports.closeNATS = async () => {
    await nc.drain();
}

