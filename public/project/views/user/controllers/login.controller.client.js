/**
 * Created by venkateshkoka on 6/20/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('loginControllerProject', loginControllerProject);

    function loginControllerProject($location, userServiceProject) {

        var model = this;

        model.login = login;
        //model.message = "koka";

        function login(username, password) {
            // var found = userService.findUserByCredentials(username, password);
            userServiceProject
                .login(username, password) // changed from findUserByCredentials to login
                .then(loginuser,loginError);

            function loginuser(user) {
                if(user === null) {
                    model.message = "sorry, invalid credentials. please try again!";

                } else {
                    $location.url('/profile');
                    console.log("Jhalak");
                    // $location.url('/login');

                }
            }
            function loginError(user) {
                model.message = "no user exists!!"

            }


        }
    }
})();