var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var checkData = require('../promises/checkData.js');

var auth = {
	authenticate: function(pg) {
					return function(req, res) {
						var login;
						if(req.param.login != undefined){
							login = req.params.login;
						}
						pg.query("SELECT * FROM users WHERE pseudo=$1::text OR email=$1::text",
								  [login], 
								  function(err, user) {

									if (err) {
										var err = JSON.parse(err);
										res.status(400).send({
											success: false,
											messages: e
										});
									}

									if (!user) {
										res.json({ success: false, message: 'Erreur d\'authentification, Mauvais identifiant' });
									} else if (user) {
										bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
										    if(err){
										    	res.status(400).json({ success: false, message: 'Erreur d\'authentification, Mauvais mot de passe' });
										    }
											// if user is found and password is right
											// create a token
											var payload = {
												name: user.pseudo,
												email: user.email
											}
											var token = jwt.sign(payload, require('../config/mySecret.js'), {
												expiresIn : 60*60*24
											});

											// return the information including token as JSON
											res.json({
												success: true,
												message: 'Enjoy your token!',
												token: token
											});
										});
									}

								  });
					}
				  },
	register: function(pg) {
					return function(req, res) {
						var firstname = req.body.firstname;
						var lastname = req.body.lastname;
						var password = req.body.password;
						var pseudo = req.body.pseudo;
						var email = req.body.email;
						
						checkData.register(pg, firstname, lastname, pseudo, password, email).then(function(){
							bcrypt.hash(password, 10).then(function(hash) {
							    pg.query("INSERT INTO users (firstname, lastname, pseudo, email, password) VALUES ($1::text,$2::text,$3::text, $4::text,$5::text)",
							    		  [firstname,lastname, pseudo, email,hash], function(err, user){
							    		  	if(err){
							    		  		if (err) throw err;
							    		  	}
							    		  	res.json({ success: true, message: 'User added.', "pseudo": pseudo});
							    		  });
							});
						}).catch(function(err){ 
									err = 'message: {' + err + '}';
									var e = JSON.parse(err);
									res.status(400).send({
										success: false,
										messages: e
									});
								});
							
					}
				}
			}

module.exports = auth;