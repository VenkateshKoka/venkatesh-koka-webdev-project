/**
 * Created by venkateshkoka on 6/25/17.
 */

// ng-click="model.searchRecipe(model.recipe)"

(function () {
    angular
        .module('pocApp')
        .controller('mainController', mainController);

    function mainController($location,$routeParams,currentUser) {
        var model = this;

        model.searchrecipe =  searchrecipe;

        model.currentUser = currentUser;


        $('#myCarousel').carousel({
            pause: 'none',
            interval :3000
        });

        function searchrecipe(recipename) {
            $location.url('/search/'+recipename);
        }

    }
})();