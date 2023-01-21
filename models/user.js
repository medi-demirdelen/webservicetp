const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    creationDate: {type: Date, required: false}
});

module.exports = mongoose.model('User', userSchema);