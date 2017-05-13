var machine = {
	getMachines: function(pg) {
			return function(req, res){
				pg.query('SELECT * FROM Machine', [], function(err, data) {
					if(err) {
						return console.error('error running query', err);
					}
					res.status(200).send(data.rows);
				});
			};
		},

	getMachineById: function(pg) {
			return function(req, res){
				var id = req.params.id;
				pg.query('SELECT * FROM Machine WHERE idmachine=$1::int', [id], function(err, data) {
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

	addMachine: function(pg) {
			return function(req, res){
				var machineName = req.body.nameMach;
				var description = req.body.descMach;
	    		var userId = req.body.userId;
				pg.query("INSERT INTO Machine (machineName, description, userid) VALUES ($1::text,$2::text, $3::int)", 
					      [machineName, description, userId], 
					      function(err, data) {
								if(err) {
									return console.error('error running query', err);
								}
								res.status(200).send("Row added");
							});
			};
		},

	updateMachine: function(pg) {
			return function(req, res){
				var id = req.params.id;
				pg.query('UPDATE Machine SET FROM Machine', [], function(err, data) {
					if(err) {
						return console.error('error running query', err);
					}
					res.status(200).send(data.rows);
				});
			};
		},

	deleteMachine: function(pg) {
			return function(req, res){
				pg.query('SELECT * FROM Machine', [], function(err, data) {
					if(err) {
						return console.error('error running query', err);
					}
					res.status(200).send(data.rows);
				});
			};
		}
}

module.exports = machine;