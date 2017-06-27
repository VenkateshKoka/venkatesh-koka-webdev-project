/**
 * Created by venkateshkoka on 6/25/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('adminCreatedRecipesController', adminCreatedRecipesController);

    function adminCreatedRecipesController($location,userService,recipeService,currentUser) {

        var model = this;

        model.currentUser = currentUser;
        
        //model.deleteRecipe = deleteRecipe;
        model.deleteCreatedRecipe = deleteCreatedRecipe;
        model.updateRecipe = updateRecipe;
        //model.editCreatedRecipe = editCreatedRecipe;

        function init() {
            findallCreatedRecipes();
        }
        init();
        
        function findallCreatedRecipes() {
            recipeService.findallCreatedRecipes()
                .then(function (recipes) {
                    model.recipes = recipes;
            })
        }
        
        function deleteCreatedRecipe(recipeId,username) {
            recipeService.deleteCreatedRecipe(recipeId,username)
                .then(function (status) {
                    findallCreatedRecipes();
            })
        }
        function updateRecipe(recipeId) {
            $location.url('/admin/recipe/edit/'+recipeId);
        }

    }
})();