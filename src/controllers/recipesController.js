const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../services/key');
const Recipes = require('../services/recipesService');
const Users = require('../services/userService');

exports.newRecipe = async (req, res) => {
    try {
        const recipe = new Recipes(req.body);
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const users = await Users.findUsers();
        const usuario = users.filter((user) => user.email === payload.email);
        await recipe.register();
        return res.status(201).json({ recipe: {
            _id: recipe.recipes.id,
            name: req.body.name,
            ingredients: req.body.ingredients,
            preparation: req.body.preparation,
            userId: usuario[0].id,
        } });
        } catch (e) {
                console.log(e);
                return res.status(400).json({ error: e });
            }
};

exports.showRecipe = async (req, res) => {
    try {
        const recipes = await Recipes.findRecipes();
        return res.status(200).json(recipes);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: e });
        } 
};

exports.showById = async (_req, res) => {
    try {
    const recipe = await Recipes.findRecipe(_req.params.id);
    /* if (!recipe) {
        return res.status(404).json({ message: 'recipe not found' });
    } */
    return res.status(200).json(recipe);
    } catch (e) {
        return res.status(404).json({ message: 'recipe not found' });
    } 
};

exports.atualizar = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { name, ingredients, preparation } = req.body;
        const payload = jwt.verify(token, JWT_SECRET);
        if (!token) { return res.status(401).json({ message: 'jwt malformed' }); } 
        const users = await Users.findUsers();
        const usuario = users.filter((user) => user.email === payload.email);
        const userId = usuario[0].id;
        const recipeNew = new Recipes({ name, ingredients, preparation, userId });
        await recipeNew.edit(req.params.id);
        const recipe = await Recipes.findRecipe(req.params.id);
        return res.status(200).json(recipe);
        } catch (err) {
            return res.status(401).json({ message: 'jwt malformed' });
        }
};

exports.deleteRecipe = async (req, res) => {
    try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, JWT_SECRET);
    if (!token || !payload) {
        return res.status(401).json({ message: 'missing auth token' });
    }
    await Recipes.delete(req.params.id);
    return res.status(204).json({ message: 'deleted' });
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: 'missing auth token' });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        if (!token) { return res.status(401).json({ message: 'jwt malformed' }); } 
        const recipe = await Recipes.findRecipe(req.params.id);
       recipe.image = `localhost:3000/src/uploads/${id}.jpeg`;
       const users = await Users.findUsers();
       const usuario = users.filter((user) => user.email === payload.email);
       recipe.userId = usuario[0].id;
       /* const newRecipe = {
            recipe,
            image: `localhost:3000/src/uploads/${id}.jpeg`,
          }; */
        return res.status(200).send(recipe);
      } catch (e) {
        console.log(e);
      }
};