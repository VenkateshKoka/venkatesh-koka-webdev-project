var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/Projectwebdevdb'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139342.mlab.com:39342/heroku_wdlht2zg'; // user yours
}
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

// require('./services/assignment-services/user.service.server');
// require('./services/assignment-services/page.service.server');
// require('./services/assignment-services/widget.service.server');
// require('./services/assignment-services/website.service.server');


require('./services/user.service.server');
require('./services/recipe.service.server');
require('./services/comment.service.server');
// require('./services/project-services/page.service.server');
// require('./services/project-services/widget.service.server');
// require('./services/project-services/website.service.server');

