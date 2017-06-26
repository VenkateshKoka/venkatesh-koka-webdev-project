(function () {
    angular
        .module('pocApp',['ngRoute', 'textAngular'])   // 'ngRoute', "textAngular"
        .config(configuration);

    function configuration($routeProvider) {
        //console.log('hekjflj');
        $routeProvider
            .when('/', {
                templateUrl: './main2.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkCurrentUser
                }
                // resolve :{
                //     currentUser : checkCurrentUser
                // }
            })

            .when('/search/:recipename', {
                templateUrl: './searchRecipeResults.html',
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
                templateUrl: './views/recipe/templates/recipeDescription.view.client.html',
                controller: 'recipeController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkCurrentUser
                }
            })
            .when('/recipe/edit/:recipeId', {
                templateUrl: './views/recipe/templates/recipeEdit.view.client.html',
                controller: 'recipeEditController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/login', {
                templateUrl: './views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: './views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/register', {
                templateUrl: './views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/recipelist', {
                templateUrl: './views/recipe/templates/recipelistFavorite.view.client.html',
                controller: 'favoriteRecipeController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/user/favoriteRecipe/:recipeId', {
                templateUrl: './views/recipe/templates/recipeFavoriteDescription.view.client.html',
                controller: 'recipeFavoriteController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/cook/recipe', {
                templateUrl: './views/recipe/templates/createdRecipesList.view.client.html',
                controller: 'createdRecipeListController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/cook/recipe/new', {
                templateUrl: './views/recipe/templates/newRecipe.view.client.html',
                controller: 'newRecipeController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/user/follow/:username', {
                templateUrl: './views/user/templates/followProfile.view.client.html',
                controller: 'followProfileController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                // controller: 'profileController',
                // controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })
            .when('/admin/comments', {
                templateUrl: 'views/admin/templates/admin-comments.view.client.html',
                controller: 'adminCommentsController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })
            .when('/admin/createdRecipes', {
                templateUrl: 'views/admin/templates/admin-createdRecipes.view.client.html',
                controller: 'adminCreatedRecipesController',
                controllerAs: 'model',
                resolve :{
                    currentUser : checkAdmin
                }
            })



    }
    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
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

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
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

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
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