/**
 * Created by venkateshkoka on 6/20/17.
 */

/**
 * Created by venkateshkoka on 5/28/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;
        model.registerAsChef = registerAsChef;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }
            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "sorry, that username is taken";
                }, function () {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userService
                        .register(newUser);
                })
                .then(function (user) {
                    $location.url('/profile' );
                });
        }
        function registerAsChef(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }
            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "sorry, that username is taken";
                }, function () {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userService
                        .registerAsChef(newUser);
                })
                .then(function (user) {
                    $location.url('/profile' );
                });
        }
    }
})();
