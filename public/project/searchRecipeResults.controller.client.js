/**
 * Created by venkateshkoka on 6/25/17.
 */

// ng-click="model.searchRecipe(model.recipe)"

(function () {
    angular
        .module('pocApp')
        .controller('mainController', mainController);

    function mainController($location,$routeParams,userService,currentUser) {
        var model = this;

        model.searchrecipe =  searchrecipe;

        model.currentUser = currentUser;
       // model.logout = logout;



        $('#myCarousel').carousel({
            pause: 'none',
            interval :3000
        });

        function searchrecipe(recipename) {
            $location.url('/search/'+recipename);
        }

        // function logout() {
        //     userService
        //         .logout()
        //         .then(function () {
        //             $location.url('/');
        //         })
        // }

    }
})();