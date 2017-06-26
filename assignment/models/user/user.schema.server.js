/**
 * Created by venkateshkoka on 6/20/17.
 */

var mongoose = require('mongoose');

var userSchemaProject = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    google: {
        id:String,
        token:String
    },
    roles : [{type:String, default:'USER', enum :['USER','ADMIN']}],
    email: String,
    // websites: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectWebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "project_user"});

module.exports = userSchemaProject;