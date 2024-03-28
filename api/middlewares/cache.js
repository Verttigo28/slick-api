const {client} = require("../../redis/redisClient");

const userCache = (req, res, next) => {
    const {uuid} = req.params;
    client.get(uuid).then((err, data) => {
        if (err) throw err;
        if (data != null) {
            res.send(data);
        } else {
            next();
        }
    })
};

const groupCache = (req, res, next) => {
    const {id} = req.params;
    client.get(id).then((err, data) => {
        if (err) throw err;
        if (data != null) {
            res.send(data);
        } else {
            next();
        }
    })
};

exports.userCache = userCache;
exports.groupCache = groupCache;