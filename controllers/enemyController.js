const Enemy = require('../models/enemy');

exports.getEnemy = (req, res, next) => {
    Enemy.find().then((e) => res.status(200).json(e));
};

exports.getEnemyById = (req, res, next) => {
    Enemy.findById(req.params.id)
        .then((e) => res.status(200).json(e));
};

exports.loseHp = (req, res, next) => {
    Enemy.findById(req.params.id)
        .then((e) => {
            Enemy.updateOne({_id: e.id}, {
                $set: {
                    hp: {
                        $min: [e.hp - req.params.hp, 0]
                    }
                }
            });
        });
}