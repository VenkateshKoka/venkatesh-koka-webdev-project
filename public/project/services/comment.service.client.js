/**
 * Created by venkateshkoka on 6/22/17.
 */
(function() {
    angular
        .module('pocApp')
        .factory('commentService', commentService);
    
    function commentService($http) {
        
        var api = {
            createComment : createComment,
            findCommentsForRecipe: findCommentsForRecipe,
            deleteComment:deleteComment,
            findAllComments:findAllComments
        }
        
        return api;
        
        function createComment(comment,recipeId,username) {
            var url = '/api/project/user/'+username+'/recipe/'+recipeId+'/comment';
            return $http.post(url,comment)
                .then(function (response) {
                    return response.data;
            })
        }

        function findAllComments() {
            var url = '/api/all/comments';
            return $http.get(url)
                .then(function (response) {
                    console.log(response+"response in comment client")
                    return response.data;
            })
        }

        function findCommentsForRecipe(recipeId) {
            var url = '/api/project/user/recipe/'+recipeId+'/comments';
            return $http.get(url)
                .then(function (response) {

                    return response.data;
            })
        }
        function deleteComment(commentId,recipeId) {
            var url = '/api/project/user/recipe/'+recipeId+'/comment/'+commentId;
            return $http.delete(url)
                .then(function (response) {
                return response.data;
            })
        }
        
        
    }
    
    
    
    
})();    