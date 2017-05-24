//Routes for all the users requests

module.exports = function(pg){

	var user = {
		getUserData: function(req, res){
					pg.query('SELECT firstname, lastname, email, pseudo FROM Users WHERE idUser=$1::int',
 					[req.Tid],
					function(err, data) {
						if(err){
							return res.sendStatus(400);
						}
						res.status(200).send(data.rows[0]);
					});
				},

		deleteUser: function(req, res){
					pg.query('DELETE FROM users WHERE iduser=$1::int',
							  [req.Tid],
							  function(err, data) {
									if(err) {
									return res.sendStatus(400);
									}
									return res.status(200).send({
										message: "User deleted"
									});
								});
				}
	}
	return user;
}
