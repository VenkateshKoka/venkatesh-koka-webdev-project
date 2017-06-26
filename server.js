/*var express = require('express');
 var app = express();

 var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 // configure a public directory to host static content
 app.use(express.static(__dirname + '/public'));

 require ("./test/app.js")(app);

 var port = process.env.PORT || 3000;

 app.listen(port);*/



var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
var passport1 = require('passport');



app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application

app.use(cookieParser()); // for parsing cookies
app.use(session({ secret: 'kokaWebdev' })); //process.env.SESSION_SECRET
app.use(passport.initialize());
app.use(passport.session());

/*app.get('/api/koka',function (req,res) {
 res.send("hello koka");
 })*/

var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('8515bd4cd542f2ee041606f0bdaaa7b9&styleId=15');


//module.exports(brewdb);
// --------- this is called routing
/*app.get('/hello',function (req, res) {
 console.log();
 res.send({message:"hello from server"});
 })*/

app.use(app.express.static(__dirname + '/public/'));

// require("assignment/app");
require('./assignment/app')

// require("./public/project/app");
// require("./public/project/app");

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;
app.listen(port);