/**
 * Created by venkateshkoka on 6/22/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('recipeFavoriteController', recipeFavoriteController);

    function recipeFavoriteController($routeParams,$location,recipeService,commentService,currentUser) {
        var model = this;
        model.currentUserId = currentUser._id;
        model.currentusername = currentUser.username;
        var recipeId = $routeParams['recipeId'];
        var username = currentUser.username;



        // model.searchFavoriteRecipeById = searchFavoriteRecipeById;

        model.renderFavoriteRecipe = renderFavoriteRecipe;
          model.createComment = createComment;
          model.renderComments = renderComments;
        model.deleteComment = deleteComment;


        function init() {
            renderFavoriteRecipe(recipeId);
            renderComments(recipeId);
        }

        init();

        function renderFavoriteRecipe (recipeId) {
            recipeService
                .searchFavoriteRecipeById(recipeId)
                .then(function (recipe) {
                    // console.log("model recipe is "+recipe);
                    model.recipe = recipe;


                })
        }

        function createComment(comment,recipeId) {
            if(comment.commentBody){
                commentService
                    .createComment(comment,recipeId, currentUser.username)
                    .then(function (response) {
                        model.message = "thanks for your feedback";
                        renderComments(recipeId);

                    })
            }
            else{
                model.message = "cannot post empty comment";
            }

        }

        function renderComments(recipeId) {
            console.log(recipeId+"the recipe **************");
            commentService
                .findCommentsForRecipe(recipeId)
                .then(function (comments) {
                    model.comments = comments;
            })
        }
        function deleteComment(commentId) {
            commentService.deleteComment(commentId,recipeId)
                .then(function (response) {
                    renderComments(recipeId);
                })
        }




    }

})();