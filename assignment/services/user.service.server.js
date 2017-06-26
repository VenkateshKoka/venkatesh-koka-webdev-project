/**
 * Created by venkateshkoka on 6/20/17.
 */

var bcrypt = require("bcrypt-nodejs");
var app = require('../../../express');
var userModelProject = require('../../models/project-models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : '564232662124-a2v5bktaih92lt3rntro0k5sdlshul19.apps.googleusercontent.com',//process.env.GOOGLE_CLIENT_ID
    clientSecret : 'kY052WUnoat2L4CdC_9Kh24K', //process.env.GOOGLE_CLIENT_SECRET
    callbackURL  : 'http://localhost:3000/auth/google/callback' //process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));



app.get('/api/project/user', isAdmin, findAllUsers);
app.post('/api/project/user', isAdmin,createUser );
app.get('/api/project/user/:userId', findUserById);
app.put('/api/project/user/:userId', isAdmin,updateUser);
app.delete ('/api/project/user/:userId', isAdmin, deleteUser);

app.post  ('/api/project/login', passport.authenticate('local'), login); //check if wam or local
app.get('/api/project/loggedin',loggedin);
app.get('/api/project/checkAdmin',checkAdmin);

app.post  ('/api/project/logout',logout); //check if wam or local
app.post ('/api/project/register',register);
app.post('/api/project/unregister',unregister);

//for google auth : endpoint
app.get('/auth/google',
    passport.authenticate('google',
        { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));


function localStrategy(username, password, done) {
    userModelProject
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
    userModelProject
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

    userModelProject
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        })
}

function register(req,res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModelProject
        .createUser(userObj)
        .then(function (user) {
            req.login(user,function (status) {
                res.send(status);
            })
        })
}



function deleteUser(req, res) {

    var userId = req.params.userId;

    userModelProject
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

    userModelProject
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

    userModelProject
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

    userModelProject
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

function findAllUsers (req,res) {
    var username = req.query['username'];
    var password = req.query.password;

    if(username && password) {
        userModelProject
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModelProject
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModelProject
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

function googleStrategy(token, refreshToken, profile, done) {
    userModelProject
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModelProject.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}
//jfgf