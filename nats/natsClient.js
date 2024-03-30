const {connect, JSONCodec} = require("nats");
//nc = await connect({servers: process.env.nats_url*/, token: process.env.nats_token});



const nc = new Promise(async (resolve, reject) => {
    const nc = await connect({servers: process.env.nats_url})
        .catch((error) => {
            console.log("Error : " + error)
            reject(error)
        })
        .then((result) => {
            console.log("Nats : Up and runing");
            resolve(result)
        })
});

module.exports = nc





