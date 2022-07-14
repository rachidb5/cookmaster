const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
}, { versionKey: false });

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;