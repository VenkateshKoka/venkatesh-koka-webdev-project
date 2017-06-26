/**
 * Created by venkateshkoka on 6/19/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('recipeController',recipeController);


    function recipeController($routeParams,$location,userServicep) {

        var model = this;

        model.renderRecipe = renderRecipe;
        var recipeId = $routeParams['recipeId'];
        console.log(recipeId);
        // model.name ="koka";

        function init() {
            renderRecipe(recipeId);
        }

        init();

        function renderRecipe (recipeId) {
            userServicep
                .searchRecipeById(recipeId)
                .then(function (recipe) {
                    console.log("model recipe is "+recipe);
                    model.recipe = recipe;

                })
        }



    }
})();