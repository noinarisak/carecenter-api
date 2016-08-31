var express = require('express'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    bodyParser = require('body-parser');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.api' });

/**
 * Connect to MongoDB
 */
var db;
if (process.env.ENV == 'Test') {
    db = mongoose.connect(process.env.MONGODB_URI_TEST);
}
else {
    db = mongoose.connect(process.env.MONGODB_URI);
}
// Use native promises
mongoose.Promise = global.Promise;
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Setup ExpressJS
 */
var app = express();
var port = process.env.PORT || 3000;
var ip_address = process.env.IP || "0.0.0.0";
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Setup Mongoose Model(s) and Route(s)
 */
var Book = require('./models/bookModel');
var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

var Organization = require('./models/organizationModel');
var Service = require('./models/serviceModel');
var organizationRouter = require('./routes/organizationRoutes')(Organization, Service);
var serviceRouter = require('./routes/serviceRoutes')(Service);

app.use('/api/organizations', organizationRouter);
app.use('/api/service', serviceRouter);

/**
 * Handle the root GET call
 */
app.get('/', function(req, res) {
    var message = { "application" : process.env.APP_NAME,
                    "version" : process.env.APP_VERSION,
                    "status" : "OK"}

    res.send(200, message);
});

app.listen(port, ip_address, function(){
    console.log('Now it changed to something else. Running on IP:'  + ip_address + ':' + port);
});

module.exports = app;