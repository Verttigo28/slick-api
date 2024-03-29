const {connect} = require("nats");

const nc = await connect({servers: process.env.nats_url, token: process.env.nats_token});

exports.nc = nc;
exports.closeNATS = async () => {
    await nc.drain();
}

