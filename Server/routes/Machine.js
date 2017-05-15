module.exports = function(pg){

	var machine = {
		getMachines: function(req, res){
					pg.query('SELECT * FROM  machine WHERE iduser=$1::int', [req.Tid], function(err, data) {
						if(err) {
							res.send(400);
						}
						res.status(200).send(data.rows);
					});
				},

		getMachineById: function(req, res){
					var id = req.params.id;
					pg.query('SELECT * FROM machine WHERE idmachine=$1::int AND iduser=$2::int', [id, req.Tid], function(err, data) {
						if(err) {
							res.send(400);
						}
						if(data.rows.length == 0){
							res.status(404).send("Exercice does not exist");
						}
						res.status(200).send(data.rows[0]);
					});
				},

		addMachine: function(req, res){
					var machineName = req.body.nameMach;
					if(machineName == undefined){
						res.send(400);
					}
					pg.query("INSERT INTO machine VALUES ($1::text,$2::int)", 
						      [machineName, req.Tid], 
						      function(err, data) {
									if(err) {
										res.send(400);
									}
									res.status(201).send("Machine added");
								});
				},

		updateMachine: function(req, res){
					var exerciceName = req.body.nameMach;
					var id = req.params.id;
					if(id == undefined || description == undefined || exerciceName == undefined){
						res.send(400);
					}
					pg.query('SELECT 1 FROM machine WHERE iduser=$1::int AND idexercice=$2::int', [req.Tid, id], function(err, data){
						if(err || data.rows.length){
							res.send(400);
						}
						pg.query('UPDATE machine SET namemachine=$1::text WHERE idMachine=$3::int', 
								  [machineName], 
								  function(err, data) {
										if(err) {
											res.send(400);
										}
										res.status(200).send("Machine " + machineName + " updated");
									});
					});
					
				},

		deleteMachine: function(req, res){
					var id = req.params.id;
					if(id == undefined){
						res.send(400);
					}
					pg.query('SELECT * FROM machine WHERE iduser=$1::int AND idmachine=$2::int', [req.Tid, id], function(err, data){
						if(err || data.rows.length){
							res.send(400);
						}
						pg.query('DELETE FROM machine WHERE idmachine=$1::int', 
								  [id], 
								  function(err, data) {
										if(err) {
											res.send(400);
										}
										res.status(200).send({
											"status" : "success",
											"message" : "Machine deleted"
										});
									});
					});
				}
	}
	return machine;
}
