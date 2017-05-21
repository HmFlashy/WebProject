var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('./lib/db.js');

var http = require('http');

var app = express();

//Parses the request body into the req object
app.use(bodyParser.json());

//Creates the different headers for the response
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//All the restricted requests pass through this middleware. Handle the authenticity
app.all('/api/*', require('./middlewares/validatingAuthenticity.js')(pg));

//Else the routes that are accessible without being authenticated
app.use('/', require('./routes')(pg));

// Catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404).send({
      "status": 404,
      "message": "Not found !"
    });
});

//Set the listening port
var port = process.env.PORT || '3000';
app.set('port', port);

//Create the server
var server = http.createServer(app);

//Open the server
server.listen(port, function(){
    console.log("Listening on " + port);
});
