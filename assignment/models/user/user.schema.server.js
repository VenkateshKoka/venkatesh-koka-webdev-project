
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    facebook: {
        id:    String,
        token: String
    },
    google: {
        id:String,
        token:String
    },
    roles : [{type:String, default:'USER', enum :['USER','ADMIN','CHEF']}],
    email: String,
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectRecipeModel"}],
    follows: [{type:String}],
    followedBy: [{type:String}],
    // createdRecipes :[{type: mongoose.Schema.Types.ObjectId, ref: "ProjectRecipeModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "project_webdev_users"});

module.exports = userSchema;



// follows: [{type: mongoose.Schema.Types.ObjectId, ref:'ProjectUserModel'}],
//     followedBy: [{type: mongoose.Schema.Types.ObjectId, ref:'ProjectUserModel'}],



