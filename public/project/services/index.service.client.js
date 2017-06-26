/**
 * Created by venkateshkoka on 6/19/17.
 */
/**
 * Created by venkateshkoka on 5/28/17.
 */
(function(){
    angular
        .module('pocApp')
        .factory('userServicep', userServicep);

    function userServicep($http) {
        // var users = [
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ];

        var app_id = "498daef8";
        var app_key = "9efa01f5e7e69933d430ae880d9312fe";
        var baseurl = "http://api.yummly.com/v1/api/recipes?_app_id="+app_id+"&_app_key="+app_key;
        // var url2 = "http://api.yummly.com/v1/api/recipes?_app_id=498daef8&_app_key=9efa01f5e7e69933d430ae880d9312fe&q=butter+chicken";

        var api = {
            searchRecipe : searchRecipe,
            searchRecipeById : searchRecipeById
        };
        return api;

        function searchRecipe(recipename) {
            var search_parameters = recipename;
            var url = baseurl+"&q="+search_parameters;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data.matches)
                    return response.data.matches;
                });
        }
        function  searchRecipeById(recipeId) {
            var url = "http://api.yummly.com/v1/api/recipe/"+recipeId+"?_app_id="+app_id+"&_app_key="+app_key;
            return $http.get(url).then(function (response) {
                // console.log(response);
                return response.data;
            })

        }



    }
})();