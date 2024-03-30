require('dotenv').config()
const {connectMongo} = require("./db/dbClient");
loadApp = async () => {
    require("./api/router")
    require("./redis/redisClient");
    require("./nats/natsClient");
    await connectMongo()
}
loadApp();

process.stdin.resume();

function exitHandler() {
    process.exit();
}
/*
process.on('exit', exitHandler.bind(null, {cleanup: true}));

process.on('SIGINT', exitHandler.bind(null, {exit: true}));

process.on('SIGUSR1', exitHandler.bind(null, {exit: true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit: true}));

process.on('uncaughtException', exitHandler.bind(null, {exit: true}));

 */