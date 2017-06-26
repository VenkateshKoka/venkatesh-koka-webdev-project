/**
 * Created by venkateshkoka on 6/19/17.
 */
/**
 * Created by venkateshkoka on 6/16/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('pocController',pocController);


    function pocController($location,userServicep) {

        var model = this;

        model.searchRecipe = searchRecipe;
        model.searchRecipeById = searchRecipeById;
        model.name ="koka";



        function searchRecipe(recipename) {
            userServicep
                .searchRecipe(recipename)
                .then(function (matches) {
                    model.recipes = matches;
                })
        }
        function searchRecipeById(recipeid) {
            userServicep.searchRecipeById(recipeid).then(function (recipe) {
                console.log(recipe);
                var recipeId = recipe.id;
                $location.url('/recipe/'+recipeId);
            })
        }



    }
})();