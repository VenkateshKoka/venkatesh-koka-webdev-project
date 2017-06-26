(function () {
    angular
        .module('pocApp',['ngRoute', 'textAngular'])   // 'ngRoute', "textAngular"
        .config(configuration);

    function configuration($routeProvider) {
        //console.log('hekjflj');
        $routeProvider
            .when('/', {
                templateUrl: './mainpage.html',
                controller: 'pocController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkCurrentUser
                }
                // resolve :{
                //     currentUser : checkCurrentUser
                // }
            })
            .when('/recipe/:recipeId', {
                templateUrl: './recipeDescription.view.client.html',
                controller: 'recipeController',
                controllerAs: 'model'
                // resolve :{
                //     currentUser : checkCurrentUser
                // }
            })
            .when('/login', {
                templateUrl: './views/user/templates/login.view.client.html',
                controller: 'loginControllerProject',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: './views/user/templates/profile.view.client.html',
                controller: 'profileControllerProject',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/register', {
                templateUrl: './views/user/templates/register.view.client.html',
                controller: 'registerControllerProject',
                controllerAs: 'model'
            })
    }
    function checkLoggedIn(userServiceProject, $q, $location) {
        var deferred = $q.defer();

        userServiceProject
            .loggedin()
            .then(function (user) {
                console.log(user);
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkAdmin(userServiceProject, $q, $location) {
        var deferred = $q.defer();

        userServiceProject
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userServiceProject, $q, $location) {
        var deferred = $q.defer();

        userServiceProject
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                    // $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
    
    // function pocController($http) {
    //     var model= this;
    //     var key = "8515bd4cd542f2ee041606f0bdaaa7b9";
    //     model.search= search;
    //     model.name = "test";
    //
    //     function search(title) {
    //         var url = "http://api.brewerydb.com/v2/beers/?key=8515bd4cd542f2ee041606f0bdaaa7b9&styleId=15";
    //         $http.get(url).then(function (response) {
    //             console.log(response);
    //         }).then(function (data) {
    //             console.log(data);
    //         });
    //     }
    // }
})();