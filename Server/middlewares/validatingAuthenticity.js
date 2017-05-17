module.exports = function(pg){	

	var jwt = require('jsonwebtoken');
	return function(req, res, next){
		var bearerToken;
	    var bearerHeader = req.headers["authorization"];
	    if (typeof bearerHeader !== 'undefined') {
	        var bearer = bearerHeader.split(" ");
	        bearerToken = bearer[1];
	        req.token = bearerToken;
	        var decode = jwt.verify(req.token, require('../config/mySecret.js'), function(err, decoded){
	        	if(err){
	        		res.send(403);
	        	} else {
	        		if(decoded.exp < Date.now()/1000){
	        			res.status(400);
		                res.json({
		                	"exp": decoded.exp,
		                	"date": Date.now(),
		                    "message": "Token expired"
		                });
	        		}
	        		pg.query("SELECT * FROM users WHERE iduser=$1::int",
	        				  [decoded.id],
	        				  function(err, user){
	        				  	if(err){
	        				  		res.status(400);
					                res.send({
					                    "message": "Bad Request"
					                });
	        				  	}
	        				  	if(user.rows[0].pseudo != decoded.name || user.rows[0].email != decoded.email){
	        				  		res.status(403);
					                res.send({
					                    "message": "Token Invalid"
					                });
	        				  	}
	        				  	req.Tid = decoded.id;
	        				  	req.Tname = decoded.name;
	        				  	req.Temail = decoded.email;
	        				  	next();
	        				  });
	        	}
	        });
	    } else {
	        res.send(403);
	    }
	}
}