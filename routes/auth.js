module.exports = function(pg){

	var jwt = require('jsonwebtoken');
	var bcrypt = require('bcryptjs');
	var checkData = require('../promises/checkData.js');

	var auth = {
		authenticate: function() {
						return function(req, res) {
							var login;
							var password;
							console.log(req.body);
							if(req.body.login != undefined){
								login = req.body.login;
							} else {
								res.send(400);
							}
							if(req.body.password != undefined){
								password = req.body.password;
							} else {
								res.send(400);
							}
							pg.query("SELECT * FROM users WHERE pseudo=$1::text OR email=$1::text",
									  [login], 
									  function(err, user) {

										if (err) {
											var err = JSON.parse(err);
											return res.status(400).send({
												success: false,
												messages: err
											});
										}
										if (user.rows.length == 0) {
											return res.status(400).send({ success: false, message: 'Erreur d\'authentification, Mauvais identifiant' });
										} else if (user) {
											bcrypt.compare(password, user.rows[0].password, function(err, data) {
											    if(data == false){
											    	return res.status(400).send({ success: false, message: 'Erreur d\'authentification, Mauvais mot de passe' });
											    }
												// if user is found and password is right
												// create a token
												console.log(user.rows[0]);
												var payload = {
													"name": user.rows[0].pseudo,
													"email": user.rows[0].email,
													"id": user.rows[0].iduser
												}
												var token = jwt.sign(payload, require('../config/mySecret.js'), {
													expiresIn : "1d",

												});

												// return the information including token as JSON
												return res.json({
													success: true,
													message: 'Enjoy your token!',
													token: token
												});
											});
										}

									  });
						}
					  },
		register: function() {
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
								    		  	return res.json({ success: true, message: 'User added.', "pseudo": pseudo});
								    		  });
								});
							}).catch(function(err){ 
										err = 'message: {' + err + '}';
										var e = JSON.parse(err);
										return res.status(400).send({
											success: false,
											messages: e
										});
									});
								
						}
					}
				}

	return auth;
}