/**
 * Created by venkateshkoka on 6/20/17.
 */

var mongoose = require('mongoose');
var userSchemaProject = require('./user.schema.server');
var userModelProject = mongoose.model('ProjectUserModel', userSchemaProject);

userModelProject.createUser = createUser;
userModelProject.findUserById = findUserById;
userModelProject.findAllUsers = findAllUsers;
userModelProject.findUserByUsername = findUserByUsername;
userModelProject.findUserByCredentials = findUserByCredentials;
userModelProject.updateUser = updateUser;
userModelProject.deleteUser = deleteUser;
userModelProject.addWebsite = addWebsite;
userModelProject.deleteWebsite = deleteWebsite;
userModelProject.findUserByGoogleId = findUserByGoogleId;

module.exports = userModelProject;

function findUserByGoogleId(googleId) {
    return userModelProject
        .findOne({'google.id': googleId})
}

function deleteWebsite(userId, websiteId) {
    return userModelProject
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModelProject
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    if(user.roles){
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
    }
    return userModelProject.create(user);
}

function findUserById(userId) {
    return userModelProject.findById(userId);
}

function findAllUsers() {
    return userModelProject.find();
}

function findUserByUsername(username) {
    return userModelProject.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModelProject.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    if(typeof newUser.roles ==='string'){
        newUser.roles = newUser.roles.split(',');
    }
    return userModelProject.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModelProject.remove({_id: userId});
}