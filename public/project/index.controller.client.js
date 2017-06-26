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


    function pocController($location,$routeParams,userServicep,currentUser) {

        var model = this;

        var recipename = $routeParams['recipename'];
        model.currentUser = currentUser;
        model.searchRecipe = searchRecipe;
        model.searchRecipeById = searchRecipeById;
        model.findRecipesForUser= findRecipesForUser;
        //model.name ="koka";


        function init() {
            searchRecipe(recipename);
        }
        init();

        function searchRecipe(recipename) {
            userServicep
                .searchRecipe(recipename)
                .then(function (matches) {
                    model.recipes = matches;
                })
        }
        function searchRecipeById(recipeid) {

                $location.url('/recipe/'+recipeid);

        }
        function findRecipesForUser() {
            $location.url('/user/recipes')
        }



    }
})();