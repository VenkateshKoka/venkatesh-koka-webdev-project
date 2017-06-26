/**
 * Created by venkateshkoka on 6/22/17.
 */

var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');

var commentModel = mongoose.model('ProjectCommentModel', commentSchema);
var recipeModel =require('../recipe/recipe.model.server');



commentModel.createComment = createComment;
commentModel.findCommentsForRecipe = findCommentsForRecipe;
commentModel.deleteComment = deleteComment;
commentModel.findAllComments = findAllComments;


module.exports = commentModel;

function createComment(comment,recipeId,username) {

    comment._recipe = recipeId;
    comment.username = username;
    comment.commentBody = comment.commentBody;
    return commentModel
        .create(comment);
        // .then(function (comment) {
        //     return recipeModel
        //         .createComment(recipeId,comment._id);
        // })
}

function findAllComments() {
    return commentModel.find();
}

function findCommentsForRecipe(recipeId) {
    return commentModel
        .find({_recipe:recipeId});
}

function deleteComment(recipeId,commentId) {
    return commentModel
        .remove({_id: commentId})
}

// username: String,
//     _recipe: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectRecipeModel"},
// commentBody: String