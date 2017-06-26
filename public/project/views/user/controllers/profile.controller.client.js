/**
 * Created by venkateshkoka on 5/28/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('profileControllerProject', profileControllerProject);

    function profileControllerProject($location, $routeParams,currentUser, userServiceProject) {

        var model = this;
        console.log("Heyyyyyyyyyy")
        // model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.unregister = unregister;
        model.logout = logout;


        function init() {
            renderUser(currentUser);
        }
        init();

        // model.user = userService.findUserById(model.userId);
        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser, userError);

        function logout() {
            userServiceProject
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function updateUser(user) {
            userServiceProject
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update successful";
                });
        }

        function unregister() {
            userServiceProject
                .unregister()
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function deleteUser() {
            userServiceProject
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