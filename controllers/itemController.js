const Item = require('../models/item');

exports.getItem = (req, res, next) => {
    Item.find().then((i) => res.status(200).json(i));
};

exports.getItemById = (req, res, next) => {
    Item.findById(req.params.id)
        .then((i) => res.status(200).json(i));
};