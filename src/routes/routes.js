const express = require('express');

const route = express.Router();

const { newUser, login } = require('../controllers/userController');
const { newRecipe,
    showRecipe,
    showById,
    deleteRecipe,
    atualizar,
    uploadImage } = require('../controllers/recipesController');
const { userAuth, emailAuth, loginAuth, loginPasswordAuth } = require('../helpers/userValidator');
const { recipesAuth, tokenAuth, tokenAuthUpdate, upload } = require('../helpers/recipesValidator');

route.post('/users', userAuth, emailAuth, newUser);
route.post('/login', loginAuth, loginPasswordAuth, login);
route.post('/recipes', recipesAuth, tokenAuth, newRecipe);
route.get('/recipes', showRecipe);
route.get('/recipes/:id', showById);
route.put('/recipes/:id', tokenAuthUpdate, atualizar);
route.delete('/recipes/:id', deleteRecipe);
route.put('/recipes/:id/image', tokenAuthUpdate, upload, uploadImage);

module.exports = route;