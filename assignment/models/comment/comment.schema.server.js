
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    username: {type:String},
    _recipe: {type: String},
    commentBody: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "project_webdev_comment"});

module.exports = commentSchema;
