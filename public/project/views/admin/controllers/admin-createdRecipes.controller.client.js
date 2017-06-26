/**
 * Created by venkateshkoka on 6/25/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('adminCreatedRecipesController', adminCreatedRecipesController);

    function adminCreatedRecipesController(userService,recipeService,currentUser) {

        var model = this;

        model.currentUser = currentUser;
        
        //model.deleteRecipe = deleteRecipe;
        model.deleteCreatedRecipe = deleteCreatedRecipe;

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

    }
})();