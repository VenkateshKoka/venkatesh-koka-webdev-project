/**
 * Created by venkateshkoka on 6/20/17.
 */

var mongoose = require('mongoose');
var q = require('q');
var userSchema = require('./user.schema.server');
// var userModelProject = mongoose.model('ProjectUserModel', userSchemaProject);

var userModel = mongoose.model('ProjectUserModel', userSchema);


userModel.createUser = createUser;
userModel.createUserAsChef = createUserAsChef;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findAllUsersToFollow = findAllUsersToFollow;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
//userModel.addWebsite = addWebsite;
//userModel.deleteWebsite = deleteWebsite;


userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;


userModel.addRecipeToFavorites = addRecipeToFavorites;
userModel.deleteFavoriteRecipe = deleteFavoriteRecipe;
//userModel.deleteCreatedRecipe = deleteCreatedRecipe;
userModel.follow = follow;
userModel.unfollow = unfollow;
userModel.findFollowUserByUsername = findFollowUserByUsername;
userModel.isFollower = isFollower;
//userModel.addRecipeToCreated = addRecipeToCreated;





module.exports = userModel;

// function addRecipeToCreated(username,recipeId) {
//     return userModel.find({username:username})
//         .then(function (user) {
//         user.createdRecipes.push(recipeId);
//         return user.save();
//     })
// }


function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}


function isFollower(mainusername,followerusername) {
    return userModel.findOne({username:followerusername})
        .then(function (user) {
            if([user.followedBy]){
                var index = user.followedBy.indexOf(mainusername);
                if(index > -1){
                    return index;

                }else {
                    return null;
                }
            }
            else {
                return null;
            }

    })
}

function follow(mainusername,followerusername) {
    // return userModel.findOne({username:mainusername})
    //     .then(function (user) {
    //         var mainuser = user;
    //        return userModel.findOne({username:followerusername})
    //            .then(function (follower) {
    //             var followeruser = follower;
    //             mainuser.followedBy.push(followeruser.username);
    //             followeruser.follows.push(mainuser.username);
    //             mainuser.save();
    //             return followeruser.save();
    //
    //        })
    //     });

    var deferred = q.defer();
    userModel
        .find({username:mainusername}, function (err, users) {
            var mainPerson = users[0];
            if(!mainPerson) {
                deferred.reject(err);
            } else {
                userModel
                    .find({username:followerusername}, function (err, users) {
                        var follower = users[0];
                        if(!follower) {
                            deferred.reject(err);
                        } else {
                            follower.followedBy.push(mainPerson.username);
                            mainPerson.follows.push(follower.username)
                            mainPerson.save();
                            follower.save();
                            userModel
                                .find({ username: { $in: mainPerson.followedBy}},
                                    function (err, users) {

                                        deferred.resolve(users);
                                    });
                        }
                    });
            }
        });
    return deferred.promise;
}

function unfollow(mainusername,followerusername) {
    // return userModel.findOne({username:mainusername})
    //     .then(function (user) {
    //         var mainuser = user;
    //         return userModel.findOne({username:followerusername})
    //             .then(function (follower) {
    //                 var followeruser = follower;
    //                 var followerindex = mainuser.followedBy.indexOf(followeruser.username);
    //                 mainuser.followedBy.splice(followerindex, 1);
    //                 var mainuserindex = followeruser.follows.indexOf(mainuser.username);
    //                 followeruser.follows.splice(mainuserindex, 1);
    //                 mainuser.save();
    //                 return followeruser.save();
    //
    //             })
    //     });
    var deferred = q.defer();
    userModel
        .find({username:mainusername}, function (err, users) {
            var mainPerson = users[0];
            if(!mainPerson) {
                deferred.reject(err);
            } else {
                userModel
                    .find({username:followerusername}, function (err, users) {
                        var unfollower = users[0];
                        if(!unfollower) {
                            deferred.reject(err);
                        } else {
                            var index_m = unfollower.followedBy.indexOf(mainPerson.username);
                            unfollower.followedBy.splice(index_m, 1);
                            var index_u = mainPerson.follows.indexOf(unfollower.username);
                            mainPerson.follows.splice(index_u, 1);
                            mainPerson.save();
                            unfollower.save();

                            userModel
                                .find({ username: { $in: mainPerson.followedBy}},
                                    function (err, users) {

                                        deferred.resolve(users);
                                    });
                        }
                    });
            }
        });
    return deferred.promise;
}

function findFollowUserByUsername(username) {
    return userModel.findOne({username:username});
}

function addRecipeToFavorites(userId,recipeId) {
    return userModel.findById(userId).then(function (user) {
        user.recipes.push(recipeId);
        return user.save();
    })
}
function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}


function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId})
}

// function deleteCreatedRecipe(username,recipeId) {
//     return userModel.find({username:username}).then(function (user) {
//         var index = user.created;
//     })
// }

function deleteFavoriteRecipe(userId, recipeId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.recipes.indexOf(recipeId);
            user.recipes.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel
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
    return userModel.create(user);
}

function createUserAsChef(user) {
    if(user.roles){
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER','CHEF'];
    }
    return userModel.create(user);
}

// createUserAsCook

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findAllUsersToFollow(username) {

    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    if(typeof newUser.roles ==='string'){
        newUser.roles = newUser.roles.split(',');
    }
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}