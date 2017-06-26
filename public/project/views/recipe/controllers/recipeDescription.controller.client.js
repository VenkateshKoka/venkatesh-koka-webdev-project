/**
 * Created by venkateshkoka on 6/19/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('recipeController',recipeController);


    function recipeController($routeParams,$location,recipeService,commentService,currentUser) { //recipeService,

        var model = this;
        model.currentUserId = currentUser._id;
        model.currentusername = currentUser.username;
        // console.log(model.currentusername);
        var recipeId = $routeParams['recipeId'];
        var username = currentUser.username;

        model.renderRecipe = renderRecipe;
        model.addRecipeToFavorites = addRecipeToFavorites;
        model.createComment = createComment;
        model.renderComments = renderComments;
        model.goBack = goBack;
        model.deleteComment = deleteComment;

        //console.log(recipeId);
        // model.name ="koka";

        function init() {
            renderRecipe(recipeId);
            renderComments(recipeId);
        }

        init();
        
        function goBack() {
            window.history.back();
        }

        function renderRecipe (recipeId) {
            recipeService
                .searchRecipeById(recipeId)
                .then(function (recipe) {
                     console.log("model recipe is "+recipe);
                    model.recipe = recipe;


                })
        }

        function addRecipeToFavorites(recipe,userId) {
            console.log(recipe);
            recipeService
                .addRecipeToFavorites(recipe,userId)
                .then(function (response) {
                model.message = "successfully added";
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
            // console.log(recipeId+"the recipe **************");
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