var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('./lib/db.js');

var http = require('http');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(express.static('Client'));

app.all('/api/*', require('./middleware/validatingAuthenticity.js')(pg));
app.use('/', require('./routes')(pg));

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404).send({
      "status": 404,
      "message": "Not found !"
    });
});

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port, function(){
    console.log("Listening on " + port);
});
