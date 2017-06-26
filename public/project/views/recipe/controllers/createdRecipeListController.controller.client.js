/**
 * Created by venkateshkoka on 6/23/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('createdRecipeListController', createdRecipeListController);

        function createdRecipeListController($routeParams,$location,recipeService,commentService,currentUser) {

            var model = this;
            model.currentUserId = currentUser._id;
            model.currentusername = currentUser.username;
            // console.log("username is +++++++++++++++"+currentUser.username)


            // var recipeId = $routeParams['recipeId'];
             var username = currentUser.username;

           // model.renderCreatedRecipesByUser = renderCreatedRecipesByUser;
            model.editCreatedRecipe = editCreatedRecipe;


            function init() {
                recipeService.searchCreatedRecipesForUser(username)
                    .then(function (recipes) {
                        model.recipes = recipes;
                    })
            }
            init();
            
            function editCreatedRecipe(recipeId) {
                $location.url('/recipe/edit/'+recipeId);
            }


        }
})();