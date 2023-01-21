const mongoose = require("mongoose");
const Item = require("./item").schema;

const heroSchema = mongoose.Schema({
    name: {type: String, required: true},
    exp: {type: Number, required: true},
    maxhp: {type: Number, required: true},
    hp: {type: Number, required: true},
    atk: {type: Number, required: true},
    def: {type: Number, required: true},
    items: {type: [Item]},
});

module.exports = mongoose.model('Hero', heroSchema);