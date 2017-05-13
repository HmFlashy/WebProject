var jwt = require('jwt-simple')

module.exports = {

	getToken: function(req){
    	return (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  	},

	getUserId: function(token){
    	return jwt.decode(token, require('../auth/config/secret')()).id;
	},

	getUsername: function(token){
		return jwt.decode(token, require('../auth/config/secret')()).username;
	},
}