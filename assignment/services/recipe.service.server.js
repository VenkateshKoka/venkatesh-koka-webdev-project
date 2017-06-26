/**
 * Created by venkateshkoka on 6/21/17.
 */

var app = require('../../express');



app.post('/api/project/user/:userId/recipe',addRecipeToFavorites);
app.get('/api/project/user/:userId/recipe',searchRecipesForUser);
app.get('/api/project/user/favoriteRecipe/:recipeId',searchFavoriteRecipeById)
app.delete('/api/project/user/:userId/recipe/:recipeId',deleteFavoriteRecipe);
app.get('/api/recipe/:username/createdRecipes',searchCreatedRecipesForUser);
app.post('/api/user/:username/cook/recipe/new',createNewRecipe);
app.get("/api/admin/allrecipes",findallCreatedRecipes);
app.delete('/api/createdRecipe/delete/:recipeId/by/:username',deleteCreatedRecipe);

var recipeModel = require('../models/recipe/recipe.model.server');


function deleteCreatedRecipe(req,res) {
    var recipeId = req.params.recipeId;
    var username = req.params.username;
    recipeModel.deleteCreatedRecipe(recipeId,username).then(function (status) {
        res.send(status);
    })
}

function createNewRecipe(req,res) {
    var recipe = req.body;
    var username = req.params.username;
    recipeModel.createNewRecipe(username,recipe)
        .then(function (recipe) {
            res.send(recipe);
    })
}

function findallCreatedRecipes(req,res) {
    recipeModel.findallCreatedRecipes()
        .then(function (recipes) {
            res.send(recipes);
    })
}

function searchCreatedRecipesForUser(req,res) {
    var username = req.params.username;
    recipeModel.searchCreatedRecipesForUser(username)
        .then(function (recipes) {
            res.send(recipes);
    })
}


function addRecipeToFavorites(req,res) {
    var recipe = req.body;
    // console.log("RECEPEEEEEEEE : "+req.body)
    recipeModel
        .addRecipeToFavorites(req.params.userId,recipe)
        .then(function (recipe) {
            res.send(recipe);
    })

}

function searchRecipesForUser(req,res) {
    var userId = req.params.userId;
    recipeModel
        .searchRecipesForUser(userId)
        .then(function (recipes) {
            res.send(recipes);
        });
}

function searchFavoriteRecipeById(req,res) {
    var recipeId = req.params.recipeId;
    recipeModel
        .searchFavoriteRecipeById(recipeId)
        .then(function (recipe) {
            res.send(recipe);
    })
}

function deleteFavoriteRecipe(req,res) {
    var recipeId = req.params.recipeId;
    var userId = req.params.userId;
    recipeModel
        .deleteFavoriteRecipe(userId,recipeId)
        .then(function (status) {
            res.send(status);
        })
}

