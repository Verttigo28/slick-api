const { userCache,groupCache } = require("../middlewares/cache");
const authMiddleware = require("../middlewares/auth");
const Group = require("../../db/schema/group");
const client = require("../../redis/redisClient");
const {router} = require("../router")
const {replaceGroupCache} = require("../../redis/pub/replaceGC");


router.get('/group/:id', [authMiddleware, groupCache], async (req, res) => {
    const id = req.params.id;
    try {
        const group = await Group.find({id});
        res.json(group);
        await client.set(id, JSON.stringify(group), {EX: 3600})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/groups', [authMiddleware, userCache], async (req, res) => {
    try {
        const groups = await Group.find()
        res.json(groups);
        for(const group of groups)  await client.set(group.id, JSON.stringify(group), {EX: 3600})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.post('/group/:id', [authMiddleware], async (req, res) => {
    const updateData = req.body;
    const id = req.params.id;
    try {
        const updateGroup = await Group.findOneAndUpdate({id}, updateData, {new: true});
        if (!updateGroup) {
            return res.status(404).send({message: "Group not found"});
        }
        res.status(200)
        replaceGroupCache(updateGroup);
        await client.set(id, JSON.stringify(updateGroup), {EX: 3600})
    } catch (error) {
        res.status(500).send({message: "Cannot update user."});
    }
});
