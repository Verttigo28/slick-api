exports.authMiddleware = (req, res, next) => {
    if (req.headers.authorization === process.env.API_TOKEN) {
        next();
    } else {
        res.status(403).send({ message: 'Invalid or missing token'});
    }
};

