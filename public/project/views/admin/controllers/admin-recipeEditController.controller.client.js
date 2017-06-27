/**
 * Created by venkateshkoka on 6/27/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('adminRecipeEditController', adminRecipeEditController);

    function adminRecipeEditController($routeParams,$location,userService,recipeService,currentUser) {

        var model = this;

        model.currentUser = currentUser;
        model.currentusername = currentUser.username;
        var recipeId = $routeParams['recipeId'];

        model.updateRecipe = updateRecipe;


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
                    $location.url('/admin/createdRecipes');
                })
        }



    }

})();
