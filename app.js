loadApp = () => {
    require("./redis/redisClient")
    require("./db/dbClient")
    require("./api/router")
}
loadApp();