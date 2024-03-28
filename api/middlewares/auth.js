exports.authMiddleware = (req, res, next) => {
    if (req.headers.Authorization === process.env.API_TOKEN) {
        next();
    } else {
        res.status(403).send({ message: 'Invalid or missing token'});
    }
};

