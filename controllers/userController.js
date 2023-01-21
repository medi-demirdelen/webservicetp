const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let user = new User({
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    creationDate: new Date()
                });
            user.save()
                .then((saved) => res.status(200).json(saved))
                .catch(() => res.status(500).json({message: '500: creation'}))
        })
        .catch(() => res.status(500).json({message: '500: chiffrement'}))
}

async function verify(token, req, res) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    User.findOne({email: payload.email})
        .then((user) => {
            if (!user) {
                req.body.email = payload.email;
                req.body.name = payload.name;
                req.body.password = payload.sub + new Date().getTime();
                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        let user = new User({
                                email: req.body.email,
                                password: hash,
                                name: req.body.name,
                                creationDate: new Date(),
                            });

                        user.save().then((saved) => res.status(200).json(saved))  
                    })
            } else {
                const token = jwt.sign({userId: user._id},'RANDOM_TOKEN_SECRET', { expiresIn: '24h'});
                user.password = '';
                user.name = payload.name;
                res.status(200).json({
                    token: token,
                    user: user
                })
            }
        });
}

exports.userLogin = (req, res, next) => {
    let token = req.body.token;
    if (token) {
        verify(token, req, res).catch(console.error);
    }
};