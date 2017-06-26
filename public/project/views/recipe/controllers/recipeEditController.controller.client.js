/**
 * Created by venkateshkoka on 6/26/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('recipeEditController', recipeEditController);

        function recipeEditController($routeParams,$location,recipeService,commentService,currentUser) {
            var model = this;
            model.currentUserId = currentUser._id;
            model.currentusername = currentUser.username;

            model.updateRecipe = updateRecipe;
            var recipeId = $routeParams['recipeId'];

            function init() {
                recipeService.searchCreatedRecipeById(recipeId)
                    .then(function(recipe) {

                        model.recipe = recipe;
                        //console.log(recipe.name);
                    })
            }
            init();
            function updateRecipe(recipeId,recipe) {
                recipeService
                    .updateRecipe(recipeId,recipe)
                    .then(function () {
                        $location.url('/cook/recipe');
                    })
            }

        }
})();