/**
 * Created by venkateshkoka on 6/22/17.
 */

var app = require('../../express');

app.post('/api/project/user/:username/recipe/:recipeId/comment',createComment);
app.get('/api/project/user/recipe/:recipeId/comments',findCommentsForRecipe);
app.delete('/api/project/user/recipe/:recipeId/comment/:commentId',deleteComment);
app.get('/api/all/comments',findAllComments);
var commentModel = require('../models/comment/comment.model.server');


function createComment(req,res) {
    var recipeId = req.params.recipeId;
    var username = req.params.username;
    var comment = req.body;

    // console.log(recipeId+username+comment);

    commentModel.createComment(comment,recipeId,username)
        .then(function (comment) {
            res.send(comment);
    })
}

function findAllComments(req,res) {
    commentModel.findAllComments()
        .then(function (comments) {
            //console.log(comments +"comments are");
            res.send(comments);
    })
}

function findCommentsForRecipe(req,res) {
    var recipeId = req.params.recipeId;
    commentModel.findCommentsForRecipe(recipeId)
        .then(function (comments) {
            if(comments){
                res.send(comments);
            }
            else {
                res.sendStatus(404).send("No comments found for the recipe!!")
            }

    })
}

function deleteComment(req,res) {
    var recipeId = req.params.recipeId;
    var commentId = req.params.commentId;
    commentModel.deleteComment(recipeId,commentId)
        .then(function (status) {
             res.send(status);
    })
}