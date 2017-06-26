/**
 * Created by venkateshkoka on 6/20/17.
 */

var bcrypt = require("bcrypt-nodejs");
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

//google strategy
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID , // '564232662124-a2v5bktaih92lt3rntro0k5sdlshul19.apps.googleusercontent.com'
//     clientSecret :  process.env.GOOGLE_CLIENT_SECRET, // ZZ
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL //'http://localhost:3000/auth/google/callback'
// };

// var facebookConfig = {
//     clientID     : '1425528574208033',
//     clientSecret : '76bf04432777c2953eb9f5a142e07d47',
//     callbackURL  : 'http://localhost:3000/auth/facebook/callback'
// };

var facebookConfig = {
    clientID     : '1425528574208033',
    clientSecret : '76bf04432777c2953eb9f5a142e07d47',
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback'
};







app.get('/api/project/user', isAdmin, findAllUsers);
app.post('/api/project/user', isAdmin,createUser );
app.get('/api/project/user/:userId', findUserById);
app.put('/api/project/user/:userId',updateUser);
app.delete ('/api/project/user/:userId', isAdmin, deleteUser);
app.get('/api/follow/user/:username',findAllUsersToFollow);
app.post('/api/follow/:mainusername/by/:followerusername',follow);
app.post('/api/unfollow/:mainusername/by/:followerusername',unfollow);
app.get('/api/follow/username/:username',findFollowUserByUsername);
app.get('/api/isFollower/:mainusername/of/:followerusername',isFollower);

app.post  ('/api/project/login', passport.authenticate('local'), login); //check if wam or local
app.get('/api/project/loggedin',loggedin);
app.get('/api/project/checkAdmin',checkAdmin);

app.post  ('/api/project/logout',logout); //check if wam or local
app.post ('/api/project/register',register);
app.post ('/api/project/register/chef',registerAsChef);
app.post ('/api/project/register/admin',registerAsAdmin)

app.post('/api/project/unregister',unregister);

//for google auth : endpoint
// app.get('/auth/google',
//     passport.authenticate('google',
//         { scope : ['profile', 'email'] }));

// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/project/#!/profile',
//         failureRedirect: '/project/#!/login'
//     }));

app.get ('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));

// passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(error) {
                done(null,false);
            }
        );
}

function follow(req,res) {
    var mainusername = req.params.mainusername;
    var followerusername = req.params.followerusername;
    userModel
        .follow(mainusername,followerusername)
        .then(function (user) {
            res.json(user);
        }, function (error) {
            res.sendStatus(500);
        });
}

function unfollow(req,res) {
    var mainusername = req.params.mainusername;
    var followerusername = req.params.followerusername;
    userModel
        .unfollow(mainusername,followerusername)
        .then(function (user) {
            res.json(user);
        }, function (error) {
            res.sendStatus(500);
        });
}

function isFollower(req,res) {
    var mainusername = req.params.mainusername;
    var followerusername = req.params.followerusername;
    userModel.isFollower(mainusername,followerusername)
        .then(function (index) {
            if(index != undefined){
                res.send("index");
            }
            else {
                res.send(undefined);
            }

    }),function (error) {
        res.sendStatus(500);
    }
}





function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        next();
    }
    else {
        res.sendStatus(401);
    }
}

function login(req,res) {
    res.json(req.user);
}

function logout(req,res) {
    // console.log("logging out")
    req.logout();
    res.sendStatus(200);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function loggedin(req,res) {
    // console.log("I am in server service");
    if(req.isAuthenticated()){
        res.send(req.user)
    } else {
        res.send('0');
    }
}

function checkAdmin(req,res) {
    // console.log("I am in server service");
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        res.send(req.user)
    } else {
        res.send('0');
    }
}

function unregister(req,res) {

    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        })
}

function register(req,res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            })
        })
}

function registerAsChef(req,res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUserAsChef(userObj)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            })
        })
}

function registerAsAdmin(req,res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUserAsAdmin(userObj)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            })
        })
}





function deleteUser(req, res) {

    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         users.splice(u, 1);
    //         res.sendStatus(200);
    //
    //         return;
    //     }
    // }
    // res.json(null);
}

function updateUser(req,res) {
    var user = req.body;

    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });

    // for(var u in users) {
    //     if(users[u]._id === req.params.userId){
    //         users[u] = user;
    //
    //         res.sendStatus(200);
    //         return
    //     }
    //
    // }
    // res.sendStatus(404);
}

function createUser(req,res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });

    // user._id = (new Date()).getTime() +"";
    // users.push(user);
    // res.json(user);
}


function  findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });

    // for(var u in users) {
    //     if(users[u]._id === userId){
    //         res.send(users[u]);
    //         return
    //     }
    //
    // }
    // res.json(null);
}

function findAllUsersToFollow(req,res) {
    var username = req.params.username;
    userModel
        .findAllUsersToFollow(username)
        .then(function (users) {
            res.send(users);
        });
}

function findFollowUserByUsername(req,res) {
    var username = req.params.username;
    userModel.findFollowUserByUsername(username).then(function (user) {
        res.send(user);
    })
}

function findAllUsers (req,res) {
    var username = req.query['username'];
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }


    // if (username && password){
    //     for(var u in users) {
    //         var user = users[u];
    //         if( user.username === username &&
    //             user.password === password) {
    //             res.json(user); // can use res.send(users) send is generic, json is used for only json objects
    //             return;
    //         }
    //     }
    //     res.json(null);
    //     //console.log("sending the response from server");
    //     return ;
    // }
    // else if(username) {
    //     for(var u in users) {
    //         var user = users[u];
    //         if( user.username === username) {
    //             res.json(user); // can use res.send(user) send is generic, json is used for only json objects
    //             return;
    //         }
    //     }
    //     res.sendStatus(404);
    //     return ;
    // }
    // else {
    //     res.send(users);
    // }

};

// function googleStrategy(token, refreshToken, profile, done) {
//     userModel
//         .findUserByGoogleId(profile.id)
//         .then(
//             function(user) {
//                 if(user) {
//                     return done(null, user);
//                 } else {
//                     var email = profile.emails[0].value;
//                     var emailParts = email.split("@");
//                     var newGoogleUser = {
//                         username:  emailParts[0],
//                         firstName: profile.name.givenName,
//                         lastName:  profile.name.familyName,
//                         email:     email,
//                         google: {
//                             id:    profile.id,
//                             token: token
//                         }
//                     };
//                     return userModel.createUser(newGoogleUser);
//                 }
//             },
//             function(err) {
//                 if (err) { return done(err); }
//             }
//         )
//         .then(
//             function(user){
//                 return done(null, user);
//             },
//             function(err){
//                 if (err) { return done(err); }
//             }
//         );
// }


// function facebookStrategy(token, refreshToken, profile, done) {
//     userModel
//         .findUserByFacebookId(profile.id)
//         .then(
//             function(user) {
//                 if(user) {
//                     return done(null, user);
//                 } else {
//                     var names = profile.displayName.split(" ");
//                     var newFacebookUser = {
//                         username : names[0],
//                         lastName:  names[1],
//                         firstName: names[0],
//                         email:     profile.emails ? profile.emails[0].value:"",
//                         facebook: {
//                             id:    profile.id,
//                             token: token
//                         }
//                     };
//                     return userModel.createUser(newFacebookUser);
//                 }
//             },
//             function(err) {
//                 if (err) { return done(err); }
//             }
//         )
//         .then(
//             function(user){
//                 return done(null, user);
//             },
//             function(err){
//                 if (err) { return done(err); }
//             }
//         );
// }


function facebookStrategy(token, refreshToken, profile, done) {

    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            }
            else {
                var userDetails = {};
                userDetails.username = profile.displayName.replace(/ /g, '');
                userDetails.firstName = profile.displayName.split(' ')[0];
                userDetails.lastName = profile.displayName.split(' ')[1];
                userDetails.facebook = {id: profile.id, token: token};
                return userModel.createUser(userDetails);
            }
        }, function (err) {
            return done(err);
        })
        .then(function (user) {
            if (user) {
                return done(null, user);
            }
        }, function (err) {
            return  done(err);
        });

}