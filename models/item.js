const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    equipable: {type: Boolean, default: false},
});

module.exports = mongoose.model('Item', itemSchema);