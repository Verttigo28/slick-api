const APIToken = process.env.API_TOKEN
const authMiddleware = (req, res, next) => {
    const token = req.headers['token'];
    if (token === APIToken) {
        next();
    } else {
        res.status(403).send({ message: 'Invalid or missing token'});
    }
};

module.exports = authMiddleware;