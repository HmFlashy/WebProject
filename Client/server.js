var express  = require('express');
var app      = express();
var port = process.env.PORT || 8080;


app.use(express.static(__dirname));


// listen  ======================================
app.listen(port,"0.0.0.0");
console.log("App listening on port "+port);