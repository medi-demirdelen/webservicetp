const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => { // next() sert à passer le relai au middleware suivant
    try {
        const email = req.headers.email;
        const token = jwt.verify(req.headers.authorization, 'RANDOM_TOKEN_SECRET');
        User.findById(token.userId)
            .then((user) => {
                if (email == user.email) {
                    next();
                } else {
                    res.status(403).json({message: '403 1'});
                }
            })
            .catch(() => res.status(403).json({message: '403 2'}));
    } catch {
        res.status(403).json({message: '403 3'});
    }
};