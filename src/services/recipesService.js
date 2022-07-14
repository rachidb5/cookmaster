const recipesModel = require('../models/recipesModel');

function recipes(body) {
    this.body = body;
    this.errors = [];
    this.recipes = null;
}

recipes.prototype.register = async function register() {
    this.recipes = await recipesModel.create(this.body);
};

recipes.findRecipes = async () => {
    const receitas = await recipesModel.find();
    return receitas;
};

recipes.findRecipe = async function findRecipe(id) {
    const recipe = await recipesModel.findById(id);
    return recipe;
};

recipes.delete = async (id) => {
    const recipe = await recipesModel.findOneAndDelete({ _id: id });
    return recipe;
};

recipes.prototype.edit = async function edit(id) {
    console.log(this.body);
    this.recipes = await recipesModel.findByIdAndUpdate(id, this.body);
};

module.exports = recipes;