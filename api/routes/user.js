const {userCache} = require("../middlewares/cache");
const {authMiddleware} = require("../middlewares/auth");
const User = require("../../db/schema/user");
const client = require("../../redis/redisClient");
let express = require('express');
const {replaceUserCache} = require("../../nats/pub/replaceUC");
let router = express.Router();

console.log("USER")


router.get('/user', userCache, async (req, res) => {

    const UUID = req.query.uuid;
    const createIfNull = req.query.createIfNull;

    const user = await User.findOne({UUID: UUID});

    if (user !== null) {
        res.status(200).json(user);
        await client.set(UUID, JSON.stringify(user), {EX: 3600})
    } else if (createIfNull) {
        const Nickname = req.query.Nickname;
        const paidAccount = req.query.paidAccount;
        const createdUser = await User.create({UUID, Nickname, paidAccount});
        res.status(200).json(createdUser);
        await client.set(UUID, JSON.stringify(createdUser), {EX: 3600})
    } else {
        res.status(404).json({status: 404, message: "User not found"});
    }


})

router.post('/user/create', [authMiddleware], async (req, res) => {
    const data = req.body;
    try {
        const createdUser = await User.create(data);
        res.status(200).json(createdUser);
        await client.set(data.UUID, JSON.stringify(createdUser), {EX: 3600})
    } catch (error) {
        res.status(500).send({message: "Cannot update user."});
    }
});


router.post('/user/update', authMiddleware, async (req, res) => {
    const updateData = req.body;
    const UUID = req.query.uuid;
    const serverUUID = req.query.serverUUID;
    try {
        let updatedUser = await User.findOneAndUpdate({UUID: "da6db8ba-1c7d-47ba-b174-437f616ce0a7"}, updateData, {new: true});

        if (!updatedUser) {
            return res.status(404).send({message: "User not found"});
        }

        let transform = updatedUser._doc
        let merge = {...transform, serverUUID }
        res.status(200).json(merge);
        replaceUserCache(merge)
        await client.set(UUID, JSON.stringify(merge), {EX: 3600})
    } catch (error) {
        console.log(error)
        //res.status(500).send({message: "Cannot update user."});
    }
});

module.exports = router;

