const mongoose = require("mongoose");

const enemySchema = mongoose.Schema({
    name: {type: String, required: true},
    maxhp: {type: Number, required: true},
    hp: {type: Number, required: true},
    atk: {type: Number, required: true},
    def: {type: Number, required: true},
});

module.exports = mongoose.model('Enemy', enemySchema);