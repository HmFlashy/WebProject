//Routes for the authentification and register requests

module.exports = function(pg){

	var jwt = require('jsonwebtoken');
	var bcrypt = require('bcryptjs');
	var checkData = require('../promises/checkData.js');

	var auth = {
		authenticate: function(req, res) {
							var login;
							var password;
							if(req.body.login == undefined || req.body.password == undefined){
								res.status(401);
					            return res.json({
					                "status": 401,
					                "message": "Invalid credentials"
					            });
					        }
							login = req.body.login.toLowerCase();
							password = req.body.password;
							pg.query("SELECT * FROM users WHERE lower(pseudo)=$1::text OR email=$1::text",
									  [login],
									  function(err, user) {

										if (err) {
											return res.send(err.http_code);
										}
										if (user.rows.length == 0) {
											res.status(404);
								            return res.json({
								                "message": "User does not exist"
								            });
										} else if (user) {
											bcrypt.compare(password, user.rows[0].password, function(err, data) {
											    if(data == false){
											    	res.status(401);
										            return res.json({
										                "status": 401,
										                "message": "Invalid credentials"
										            });
												}
												// if user is found and password is right
												// create a token
												var payload = {
													"name": user.rows[0].pseudo,
													"email": user.rows[0].email,
													"id": user.rows[0].iduser
												}
												var token = jwt.sign(payload, require('../config/mySecret.js'), {
													expiresIn : "1d",

												});

												// return the information including token as JSON
												return res.status(200).json({
													success: true,
													message: 'Enjoy your token!',
													token: token
												});
											});
										}

									  });
						},
		register: function(req, res) {
							var firstname = req.body.firstname;
							var lastname = req.body.lastname;
							var password = req.body.password;
							var pseudo = req.body.pseudo;
							var email = req.body.email;

							//Check if all the variables are correct
							checkData.register(pg, firstname, lastname, pseudo, password, email).then(function(){
								//If everything is going well we add the new user crypting his password
								bcrypt.hash(password, 10, function(err, hash) {
								    pg.query("INSERT INTO users (firstname, lastname, pseudo, email, password) VALUES ($1::text,$2::text,$3::text, $4::text,$5::text)",
								    		  [firstname,lastname, pseudo, email, hash], function(err, user){
								    		  	if(err){
															console.log(err);
															return res.sendStatus(400);
								    		  	}
								    		  	return res.status(201).json({ success: true, message: 'User added.', "pseudo": pseudo});
								    		  });
								});
							}).catch(function(err){
									console.log(err);
										err = '{ message: {' + err + '}}';
										return res.status(401).send({
											success: false,
											messages: err
										});
									});

						}
					}

	return auth;
}
