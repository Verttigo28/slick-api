require('dotenv').config()
const {closeNATS, startNats} = require("./nats/natsClient");
const {connectMongo} = require("./db/dbClient");
loadApp = async () => {
    require("./api/router")
    require("./redis/redisClient");
    await startNats()
    await connectMongo()
}
loadApp();

process.stdin.resume();

function exitHandler() {
    closeNATS();
    process.exit();
}

process.on('exit', exitHandler.bind(null, {cleanup: true}));

process.on('SIGINT', exitHandler.bind(null, {exit: true}));

process.on('SIGUSR1', exitHandler.bind(null, {exit: true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit: true}));

process.on('uncaughtException', exitHandler.bind(null, {exit: true}));