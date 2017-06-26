/**
 * Created by venkateshkoka on 6/20/17.
 */

/**
 * Created by venkateshkoka on 5/28/17.
 */
(function(){
    angular
        .module('pocApp')
        .factory('userServiceProject', userServiceProject);

    function userServiceProject($http) {
        // var users = [
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ];

        var api = {
            createUser: createUser,
            register : register,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers : findAllUsers,
            login : login,
            checkAdmin : checkAdmin,
            logout : logout,
            loggedin : loggedin,
            updateUser: updateUser,
            deleteUser:deleteUser,
            unregister : unregister
        };
        return api;

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (status) {
                    return status;
                });
        }

        function login(username,password) {
            var url = "/api/project/login";
            var credentials = {
                username :username,
                password : password
            }
            return $http.post(url,credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                })
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function register(userObj) {
            var url = "/api/project/register";
            return $http
                .post(url,userObj)
                .then(function (response) {
                    return response.data;
                })
        }
        function unregister(userObj) {
            var url = "/api/project/unregister";
            return $http
                .post(url,userObj)
                .then(function (response) {
                    return response.data;
                })
        }


        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http
                .put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {

            var url = "/api/project/user";
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                });
            // user._id = (new Date()).getTime() + "";
            // user.created = new Date();
            // users.push(user);
            // return user;
        }

        function findUserByUsername(username) {

            var url = "/api/project/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var user = users.find(function (user) {
            //     return user.username === username;
            // });
            // if(typeof user === 'undefined') {
            //     return null;
            // }
            // return user;

        }

        function findUserById(userId) {

            var url = "/api/project/user/"+userId;
            return  $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                })
            // for(var u in users) {
            //     if(users[u]._id === userId)
            //         return users[u];
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
            // for(var u in users) {
            //     var user = users[u];
            //     if( user.username === username &&
            //         user.password === password) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function findAllUsers() {
            var url = "/api/project/user";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();