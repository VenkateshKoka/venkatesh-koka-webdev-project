/**
 * Created by venkateshkoka on 6/23/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('followProfileController', followProfileController);

        function followProfileController($location, $routeParams,currentUser, userService,recipeService) {
            var model = this;
             var secondaryusername = $routeParams['username'];
            model.currentUser = currentUser;
            var isFollowerusername = currentUser.username;
           // var mainId = currentUser._id;
            model.follow = follow;
            model.logout = logout;
            model.unfollow = unfollow;
            model.renderAnotherUser = renderAnotherUser;
            //model.isFollower= isFollower;



            function init() {
                renderAnotherUser(secondaryusername);
               // isFollower(isFollowerusername,$routeParams['username']);

            }
            init();

            function follow(mainusername,followerusername) {
                userService.follow(mainusername,followerusername)
                    .then(function () {
                        model.message = "followed successfully!!";
                        renderAnotherUser(followerusername);
                       // isFollower(isFollowerusername,secondaryusername);
                    })
            }

            function unfollow(mainusername,followerusername) {
                userService.unfollow(mainusername,followerusername)
                    .then(function () {
                        model.message = "Unfollowed successfully!!";
                         renderAnotherUser(followerusername);
                         // isFollower(isFollowerusername,secondaryusername);
                    })
            }
            function logout() {
                userService
                    .logout()
                    .then(function () {
                        $location.url('/login');
                    })
            }

            function renderAnotherUser(username) {
                userService.findFollowUserByUsername(username)
                    .then(function (anotheruser) {
                        model.anotheruser = anotheruser;
                })
            }
            // function isFollower(mainusername,followerusername) {
            //     userService.isFollower(mainusername,followerusername)
            //         .then(function (response) {
            //             if(response){
            //                 model.index = response;
            //             }
            //             else {
            //                 model.indexerror = "index";
            //             }
            //
            //     })
            //
            // }

        }
})();
