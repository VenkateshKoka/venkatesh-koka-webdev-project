/**
 * Created by venkateshkoka on 6/20/17.
 */

/**
 * Created by venkateshkoka on 5/28/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('registerControllerProject', registerControllerProject);

    function registerControllerProject($location, userServiceProject) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            // var found = userService.findUserByUsername(username);
            userServiceProject
                .findUserByUsername(username)
                .then(function () {
                    model.error = "sorry, that username is taken";
                }, function () {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userServiceProject
                        .register(newUser);
                })
                .then(function (user) {
                    $location.url('/profile' );
                });



            // if(found !== null) {
            //     model.error = "sorry, that username is taken";
            // } else {
            //     var newUser = {
            //         username: username,
            //         password: password
            //     };
            //     newUser = userService.createUser(newUser);
            //     $location.url('/user/' + newUser._id);
            // }
        }
    }
})();
