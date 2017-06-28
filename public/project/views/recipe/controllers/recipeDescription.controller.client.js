/**
 * Created by venkateshkoka on 6/19/17.
 */
(function () {
    angular
        .module('pocApp')
        .controller('recipeController',recipeController);


    function recipeController($routeParams,$location,recipeService,userService,commentService,currentUser) { //recipeService,

        var model = this;
        model.currentUserId = currentUser._id;
        model.currentUser = currentUser;
        model.currentusername = currentUser.username;
        // console.log(model.currentusername);
        var recipeId = $routeParams['recipeId'];
        model.recipeId = $routeParams['recipeId'];
        var username = currentUser.username;

        model.renderRecipe = renderRecipe;
        model.addRecipeToFavorites = addRecipeToFavorites;
        model.createComment = createComment;
        model.renderComments = renderComments;
        model.goBack = goBack;
        model.deleteComment = deleteComment;
        model.isRecipeLiked = isRecipeLiked;

        //console.log(recipeId);
        // model.name ="koka";

        function init() {
            renderRecipe(recipeId);
            renderComments(recipeId);
            isRecipeLiked(recipeId);
        }

        init();
        
        function goBack() {
            window.history.back();
        }

        function isRecipeLiked(recipeId) {
            recipeService
                .searchRecipesForUser(currentUser._id)
                .then(function (recipes) {
                    if(recipes){
                        for (i = 0; i < recipes.length; i++) {
                            if($routeParams['recipeId'] === recipes[i].recipeId){
                                model.isLiked = true;
                                model.notLiked = true;
                                return
                            }

                        }

                    }
                    else{
                        model.isLiked = false;
                    }

                    // console.log("model recipe is "+recipe);
                    // model.recipes = recipes;
                })
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
            // console.log(recipe);
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