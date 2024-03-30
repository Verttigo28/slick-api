const client= require("../../redis/redisClient");

const userCache = (req, res, next) => {
    const uuid = req.query.uuid;
    client.get(uuid).then((data) => {
        if (data != null) {
            res.json(JSON.parse(data));
        } else {
            next();
        }
    })
};

const groupCache = (req, res, next) => {
    const id = req.query.id;
    client.get(id).then((data) => {
        if (data != null) {
            res.json(JSON.parse(data));
        } else {
            next();
        }
    })
};

exports.userCache = userCache;
exports.groupCache = groupCache;