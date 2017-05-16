var express  = require('express');
var app      = express();
var port = process.env.PORT || 8080;


app.use(express.static(__dirname));
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});

// listen  ======================================
app.listen(port,"0.0.0.0");
console.log("App listening on port "+port);