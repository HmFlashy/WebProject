//Routes for the machines requests

module.exports = function(pg){

	var machine = {
		getMachines: function(req, res){
					pg.query('SELECT * FROM machine WHERE iduser=$1::int', [req.Tid], function(err, data) {
						if(err) {
						return res.sendStatus(400);
						}
						return res.status(200).send(data.rows);
					});
				},

		getMachineById: function(req, res){
					var id = req.params.id;
					pg.query('SELECT * FROM machine WHERE idmachine=$1::int AND iduser=$2::int', [id, req.Tid], function(err, data) {
						if(err) {
						return res.sendStatus(400);
						}
						if(data.rows.length == 0){
							return res.status(404).send("Exercice does not exist");
						}
						return res.status(200).send(data.rows[0]);
					});
				},

		addMachine: function(req, res){
					var machineName = req.body.nameMach;
					if(machineName == undefined){
					return res.sendStatus(400);
					}
					pg.query("INSERT INTO machine (namemachine, iduser) VALUES ($1::text, $2::int) RETURNING *",
						      [machineName, req.Tid],
						      function(err, data) {
									if(err) {
									return res.sendStatus(400);
									}
									return res.status(201).send(data.rows[0]);
								});
				},

		updateMachine: function(req, res){
					var machineName = req.body.nameMach;
					var id = req.params.id;
					if(id == undefined || description == undefined || exerciceName == undefined){
					return res.sendStatus(400);
					}
					pg.query('UPDATE machine SET namemachine=$1::text WHERE idmachine=$2::int AND iduser=3::int',
							  [machineName, id, req.Tid],
							  function(err, data) {
									if(err) {
									return res.sendStatus(400);
									}
									return res.status(200).send("Machine " + machineName + " updated");
								});

				},

		deleteMachine: function(req, res){
					var id = req.params.id;
					if(id == undefined){
					return res.sendStatus(400);
					}
					pg.query('DELETE FROM machine WHERE idmachine=$1::int AND iduser=$2::int',
							  [id, req.Tid],
							  function(err, data) {
									if(err) {
									return res.sendStatus(400);
									}
									return res.status(200).send({
										"status" : "success",
										"message" : "Machine deleted"
									});
								});
				}
	}
	return machine;
}
