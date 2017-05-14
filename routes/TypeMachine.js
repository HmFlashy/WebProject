module.exports = function(pg){

	var machine = {
		getTypesMachines: function() {
				return function(req, res){
					pg.query('SELECT * FROM exercice NATURAL JOIN WHERE iduser=$1::int', [req.Tid], function(err, data) {
						if(err) {
							res.send(400);
						}
						res.status(200).send(data.rows);
					});
				};
			},

		getMachineById: function() {
				return function(req, res){
					var id = req.params.id;
					pg.query('SELECT * FROM exercice WHERE idexercice=$1::int AND iduser=$2::int', [id, req.Tid], function(err, data) {
						if(err) {
							res.send(400);
						}
						if(data.rows.length == 0){
							res.status(404).send("Exercice does not exist");
						}
						res.status(200).send(data.rows[0]);
					});
				};
			},

		getMachine: function() {
				return function(req, res){
					var exerciceName = req.body.nameExerc;
					var description = req.body.descExerc;
					if(description == undefined || exerciceName == undefined){
						res.send(400);
					}
					pg.query("INSERT INTO exercice (exerciceName, description, iduser) VALUES ($1::text,$2::text, $3::int)", 
						      [exerciceName, description, req.Tid], 
						      function(err, data) {
									if(err) {
										res.send(400);
									}
									res.status(201).send("Row added");
								});
				};
			},

		updateMachine: function() {
				return function(req, res){
					var exerciceName = req.body.nameMach;
					var description = req.body.descMachine;
					var id = req.params.id;
					if(id == undefined || description == undefined || exerciceName == undefined){
						res.send(400);
					}
					pg.query('SELECT * FROM exercice NATURAL JOIN users WHERE iduser=$1::int AND idexercice=$2::int', [req.Tid, id], function(err, data){
						if(err || data.rows.length){
							res.send(400);
						}
						pg.query('UPDATE exercice SET exerciceName=$1::string, description=$2::string WHERE idMachine=$3::int', 
								  [machineName, description, id], 
								  function(err, data) {
										if(err) {
											res.send(400);
										}
										res.status(200).send("Machine " + machineName + " updated");
									});
					});
					
				};
			},

		deleteMachine: function() {
				return function(req, res){
					var id = req.params.id;
					if(id == undefined){
						res.send(400);
					}
					pg.query('SELECT * FROM exercice NATURAL JOIN machine WHERE iduser=$1::int AND idmachine=$2::int', [req.Tid, id], function(err, data){
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
											"status" : "success"
											"message" : "Machine deleted"
										});
									});
					});
				};
			}
	}
	return exercice;
}
