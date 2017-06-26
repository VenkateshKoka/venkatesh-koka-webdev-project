/**
 * Created by venkateshkoka on 6/24/17.
 */

(function () {
    angular
        .module('pocApp')
        .controller('adminCommentsController', adminCommentsController);

        function adminCommentsController($routeParams,$location,recipeService,commentService,currentUser) {
            var model = this;

           // model.findAllComments = findAllComments;
            model.deleteComment = deleteComment;
            model.findAllComments = findAllComments;

            function init() {
                findAllComments();
            }
            init();


            function findAllComments() {
                commentService
                    .findAllComments()
                    .then(function (comments) {
                        console.log(comments+"these are the comments")
                        model.comments = comments;
                    })
            }
            function deleteComment(commentId,recipeId) {
                commentService.deleteComment(commentId,recipeId)
                    .then(function (response) {
                        findAllComments();
                    })
            }
        }


})();