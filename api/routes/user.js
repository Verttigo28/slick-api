const {userCache} = require("../middlewares/cache");
const authMiddleware = require("../middlewares/auth");
const User = require("../../db/schema/user");
const {client} = require("../../redis/redisClient");
const {router} = require("../router")


router.get('/user/:uuid', [authMiddleware, userCache], async (req, res) => {
    const UUID = req.params.uuid;
    try {
        const user = await User.findById(UUID);
        res.json(user);
        await client.set(UUID, JSON.stringify(user), {EX: 3600})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
s

router.get('/users/:array', [authMiddleware], async (req, res) => {
    const UUIDs = JSON.parse(req.params.array);
    try {
        const users = await User.find({UUID: {$in: UUIDs}})
        for (const user of users) {
            await client.set(user.UUID, user, {EX: 3600})
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


router.post('/user/:uuid', [authMiddleware], async (req, res) => {
    const updateData = req.body;
    const UUID = req.params.uuid;
    try {
        const updatedUser = await User.findOneAndUpdate({UUID}, updateData, {new: true}); // Recherche par UUID et mise à jour
        if (!updatedUser) {
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).json(updatedUser);
        await client.set(UUID, JSON.stringify(updatedUser), {EX: 3600})
    } catch (error) {
        res.status(500).send({message: "Cannot update user."});
    }
});

