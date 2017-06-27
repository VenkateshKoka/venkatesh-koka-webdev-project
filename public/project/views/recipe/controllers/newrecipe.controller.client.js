/**
 * Created by venkateshkoka on 6/23/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('newRecipeController', newRecipeController);

        function newRecipeController($routeParams,$location,recipeService,commentService,currentUser) {
            var model = this;
            model.currentUserId = currentUser._id;
            model.currentusername = currentUser.username;
            var username = currentUser.username;
            model.createNewRecipe=createNewRecipe;

            function createNewRecipe(recipe) {
                if(!(recipe.name ==='' || recipe.preparation==='')){
                    var username = currentUser.username;
                    recipeService.createNewRecipe(username,recipe)
                        .then(function (response) {
                            $location.url('/cook/recipe');
                        })
                }
                }


        }

})();