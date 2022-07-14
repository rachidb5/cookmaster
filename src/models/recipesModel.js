const mongoose = require('mongoose');

const recipesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    preparation: { type: String, required: true },
    userId: { type: String },
    image: { type: String },
}, { versionKey: false });

const recipesModel = mongoose.model('recipes', recipesSchema);

module.exports = recipesModel;