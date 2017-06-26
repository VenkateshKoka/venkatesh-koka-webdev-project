/**
 * Created by venkateshkoka on 6/16/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('adminUsersController',adminUsersController);


    function adminUsersController(userService,currentUser) {
        var model = this;

        model.currentUser = currentUser;

        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        };
        init();

        function selectUser(user) {
            console.log(user);
            model.user = angular.copy(user);
        }
        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function updateUser(user) {
            userService
                .updateUser(user._id,user)
                .then(findAllUsers);
        }

        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers);
        }
        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
            })
        }

        
    }
})();