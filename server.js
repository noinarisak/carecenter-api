var express = require('express');
var app = express();
var port = process.env.PORT

app.get('/', function(req, res) {
    res.send(200, { "carecenter-api" : { "version" : 0.1, status : "OK" } });
});

require('./routes')(app);

app.listen(port);
console.log('Server running at https://carecenter-api-srecinto.c9users.io/');
console.log('Listening on port ' + port + '...');


