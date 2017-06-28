/**
 * Created by venkateshkoka on 6/21/17.
 */

var mongoose = require('mongoose');
var recipeSchema = require('./recipe.schema.server');
var recipeModel = mongoose.model('ProjectRecipeModel', recipeSchema);
var userModel =require('../user/user.model.server');



recipeModel.addRecipeToFavorites = addRecipeToFavorites;
recipeModel.searchRecipesForUser = searchRecipesForUser;
recipeModel.searchFavoriteRecipeById = searchFavoriteRecipeById;
recipeModel.deleteFavoriteRecipe = deleteFavoriteRecipe;
//recipeModel.createComment = createComment;
recipeModel.searchCreatedRecipesForUser = searchCreatedRecipesForUser;
recipeModel.createNewRecipe = createNewRecipe;
recipeModel.findallCreatedRecipes = findallCreatedRecipes;
recipeModel.deleteCreatedRecipe = deleteCreatedRecipe;
recipeModel.searchRecipesForUsername = searchRecipesForUsername;
recipeModel.searchCreatedRecipeById = searchCreatedRecipeById;
recipeModel.updateRecipe = updateRecipe








module.exports = recipeModel;

function updateRecipe() {

}

function searchCreatedRecipeById(recipeId) {
    return recipeModel.findOne({_id:recipeId});
}
function searchRecipesForUsername(username) {
    return recipeModel.find({_createdUser:username});
}

function deleteCreatedRecipe(recipeId,username) {
    return recipeModel.remove({_id:recipeId});
    // .then(function (status) {
    //     return userModel.deleteCreatedRecipe(username,recipeId);
    // })
}


function createNewRecipe(username,recipe) {
    recipe._createdUser = username;
    var imageurl = "https://lh3.googleusercontent.com/2teHUYh2fCPxCMhMJp_uU5tCbPJhxQSf0fEqX3Sv54tHmRHH9Z7nwvjub2krD-OcDXbHzuC1kTXscgvLqnzwQA=s360";
    recipe.imageURL = imageurl;
    recipe.ingredientLines = recipe.ingredients;
    return recipeModel.create(recipe);
    //     .then(function (recipe) {
    //         return recipe;// userModel.addRecipeToCreated(username,recipe._id);
    // })
}

function findallCreatedRecipes() {
    return recipeModel.find({_createdUser:{$exists:true}});
}

function searchCreatedRecipesForUser(username) {
    return recipeModel.find({_createdUser:username});
}

function addRecipeToFavorites(userId, recipe) {
    recipe._user = userId;

    recipe.recipeId = recipe.id;
    recipe.name = recipe.name;
    recipe.totalTimeInSeconds = recipe.totalTimeInSeconds;
    recipe.imageURL = recipe.images[0].hostedLargeUrl;
    recipe.ingredientLines = recipe.ingredientLines;
    return recipeModel
        .create(recipe)
        .then(function (recipe) {
            return userModel
                .addRecipeToFavorites(userId,recipe._id);
    })
}

function searchRecipesForUser(userId) {
    return recipeModel
            .find({_user: userId})
            .populate('_user')
            .exec();
}

function searchFavoriteRecipeById(recipeId) {
    return recipeModel
        .findOne({recipeId : recipeId});
}


function deleteFavoriteRecipe(userId, recipeId) {
    return recipeModel
        .remove({_id: recipeId})
        .then(function (status) {
            return userModel
                .deleteFavoriteRecipe(userId, recipeId);
        });
}

// function createComment(recipeId,commentId) {
//     return recipeModel.findOne({recipeId:recipeId})
//         .then(function (recipe) {
//         recipe.comments.push(commentId);
//         return recipe.save();
//     })
// }


