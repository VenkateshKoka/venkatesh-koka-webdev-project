/**
 * Created by venkateshkoka on 6/21/17.
 */

(function () {
    angular
        .module('pocApp')
        .factory('recipeService', recipeService);

    function recipeService($http) {

        var app_id = "498daef8";
        var app_key = "9efa01f5e7e69933d430ae880d9312fe";
        var baseurl = "http://api.yummly.com/v1/api/recipes?_app_id="+app_id+"&_app_key="+app_key;

        var api = {
            addRecipeToFavorites : addRecipeToFavorites,
            searchRecipeById : searchRecipeById,
            searchRecipesForUser : searchRecipesForUser,
            searchFavoriteRecipeById: searchFavoriteRecipeById,
            deleteFavoriteRecipe : deleteFavoriteRecipe,
            searchCreatedRecipesForUser: searchCreatedRecipesForUser,
            createNewRecipe : createNewRecipe,
            findallCreatedRecipes : findallCreatedRecipes,
            deleteCreatedRecipe:deleteCreatedRecipe,
            searchRecipesForUsername:searchRecipesForUsername,
            searchCreatedRecipeById:searchCreatedRecipeById,
            updateRecipe:updateRecipe

        }

        return api;

        function updateRecipe(recipeId,recipe) {
            var url = '/api/update/recipe/'+recipeId;
            return $http.put(url,recipe)
                .then(function (response) {
                    return response.data;
            })
        }

        function searchRecipesForUsername(username) {
            var url = '/api/username/'+username+'/recipe';
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function deleteCreatedRecipe(recipeId,username) {
                var url = '/api/createdRecipe/delete/'+recipeId+'/by/'+username;
                return $http.delete(url).then(function (response) {
                    return response.data;
                })
        }


        function createNewRecipe(username,recipe) {
            var url = "/api/user/"+username+"/cook/recipe/new";
            return $http.post(url,recipe)
                .then(function (response) {
                    // console.log(response.data+"_______--------------_____________-");
                    return response.data;
                })

        }

        function findallCreatedRecipes() {
            var url = "/api/admin/allrecipes";
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function searchCreatedRecipesForUser(username) {
            var url = '/api/recipe/'+username+'/createdRecipes';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
            })
        }

        function searchRecipesForUser(userId) {
            var url = '/api/project/user/'+userId+'/recipe';
            return $http.get(url).then(function (response) {
                return response.data;
            })

        }

        function addRecipeToFavorites(recipeObj,userId) {
            var url = '/api/project/user/'+userId+'/recipe';
            return $http
                .post(url,recipeObj)
                .then(function (response) {
                    return response.data;
            })

        }

        function  searchRecipeById(recipeId) {
            var url = "http://api.yummly.com/v1/api/recipe/"+recipeId+"?_app_id="+app_id+"&_app_key="+app_key;
            return $http.get(url).then(function (response) {
                //console.log("in the index.service.client"+response);
                return response.data;
            })

        }
        function searchCreatedRecipeById(recipeId) {
            var url = '/api/createdRecipe/edit/'+recipeId;
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function searchFavoriteRecipeById(recipeId) {
            var url = "/api/project/user/favoriteRecipe/"+recipeId;
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function deleteFavoriteRecipe(recipeId,userId) {
            var url = "/api/project/user/"+userId+"/recipe/"+recipeId;
            return $http
                .delete(url,userId)
                .then(function (response) {
                    return response.data;
                })
        }


    }

})();
