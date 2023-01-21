const Hero = require('../models/hero');

exports.getHero = (req, res, next) => {
    Hero.find().then((h) => res.status(200).json(h));
};

exports.getHeroById = (req, res, next) => {
    Hero.findById(req.params.id)
        .then((h) => res.status(200).json(h));
};

exports.loseHp = (req, res, next) => {
    Hero.findById(req.params.id)
        .then((h) => {
            Hero.updateOne({_id: h.id}, {
                $set: {
                    hp: {
                        $min: [h.hp - req.params.hp, 0]
                    }
                }
            });
        });
}

exports.gainHp = (req, res, next) => {
    Hero.findById(req.params.id)
        .then((h) => {
            Hero.updateOne({_id: h.id}, {
                $set: {
                    hp: {
                        $max: [h.hp + req.params.hp, h.maxhp]
                    }
                }
            });
        });
}

exports.gainXp = (req, res, next) => {
    Hero.findById(req.params.id)
        .then((h) => {
            Hero.updateOne({_id: h.id}, {
                $set: {
                    exp: exp + req.params.exp
                }
            });
        });
}