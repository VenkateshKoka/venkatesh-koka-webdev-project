/**
 * Created by venkateshkoka on 5/28/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('profileController', profileController);

    function profileController($location, $routeParams,currentUser, userService) {

        var model = this;

        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.currentUser = currentUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.unregister = unregister;
        model.logout = logout;
        model.findAllUsersToFollow = findAllUsersToFollow;



        function init() {
            renderUser(currentUser);
        }
        init();

        // model.user = userService.findUserById(model.userId);
        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser, userError);



        function findAllUsersToFollow(username) {
            userService.findAllUsersToFollow(username)
                .then(function (users) {
                     model.users = users;
            })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {

                    model.message = "User update successful";
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function deleteUser() {
            userService
                .deleteUser()
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function renderUser(user) {
            // console.log(response);
            model.user = user;
        }
        function userError(){

            model.errorinfo = "User not found";
        }



    }
})();