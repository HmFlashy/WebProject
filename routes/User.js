module.exports = function(pg){

	var user = {
		getUserById: function() {
				return function(req, res){
					var id = req.params.id;
					pg.query('SELECT * FROM Users WHERE idUser=$1::int', [id], function(err, data) {
						if(err) {
							return console.error('error running query', err);
						}
						if(data.rows.length == 0){
							res.status(404).send("Machine does not exist");
						}
						res.status(200).send(data.rows);
					});
				};
			},

		updateUser: function() {
				return function(req, res){
					
					var id = req.body.nameMach;
					var description = req.body.descMachine;
					var id = req.params.id;
					pg.query('UPDATE Machine SET machineName=$1::string, description=$2::string WHERE idMachine=$3::int', 
							  [machineName, description, id], 
							  function(err, data) {
									if(err) {
										return console.error('error running query', err);
									}
									res.status(200).send("Machine " + machineName + " updated");
								});
				};
			},

		deleteMachine: function() {
				return function(req, res){
					var id = req.params.id;
					pg.query('DELETE FROM Machine WHERE idMachine=$1::int', 
							  [id], 
							  function(err, data) {
									if(err) {
										return console.error('error running query', err);
									}
									res.status(200).send(data.rows);
								});
				};
			}
	}
	return machine;
}
