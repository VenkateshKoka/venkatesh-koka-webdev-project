/**
 * Created by venkateshkoka on 6/22/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('favoriteRecipeController', favoriteRecipeController);

    function favoriteRecipeController($routeParams,$location,recipeService,currentUser) { //recipeService,

        var model = this;
        model.currentUserId = currentUser._id;
       // var userId =
        // var recipeId = $routeParams['recipeId'];
        // console.log("current user ID is "+model.currentUserId)
        //var userId = currentUser._id;


        model.renderRecipes = renderRecipes;
        model.searchFavoriteRecipeById = searchFavoriteRecipeById;
        model.deleteFavoriteRecipe = deleteFavoriteRecipe;
        model.addRecipeToFavorites = addRecipeToFavorites;

        //console.log(recipeId);
        // model.name ="koka";

        function init() {
            renderRecipes();
        }

        init();

        function renderRecipes () {
            recipeService
                .searchRecipesForUser(currentUser._id)
                .then(function (recipes) {
                    // console.log("model recipe is "+recipe);
                    model.recipes = recipes;
                })
        }

        function addRecipeToFavorites(recipe,userId) {
            // console.log(recipe);
            recipeService
                .addRecipeToFavorites(recipe,userId)
                .then(function (response) {
                    model.message = "successfully added";
                })

        }
        function searchFavoriteRecipeById(recipeId) {
            recipeService
                .searchFavoriteRecipeById(recipeId)
                .then(function (response) {
                    $location.url('/user/favoriteRecipe/'+recipeId);
            })
        }

        function deleteFavoriteRecipe(recipeId) {
            recipeService
                .deleteFavoriteRecipe(recipeId,currentUser._id)
                .then(function (response) {
                     init();
            })
        }



    }


})();