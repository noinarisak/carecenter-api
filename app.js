var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db;
if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://noinarisak-carecenterdb-webservice-3148390/bookAPI_Test');
}
else {
    db = mongoose.connect('mongodb://noinarisak-carecenterdb-webservice-3148390/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
   res.send('Welcome to my API.');
});

app.listen(port, function() {
    console.log('Now it changed to something else. Running on PORT:' + port);
});

module.exports = app;