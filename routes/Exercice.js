module.exports = function(pg){

	var exercice = {
		getExercices: function() {
				return function(req, res){
					pg.query('SELECT * FROM Machine WHERE iduser=$1::int', [req.Tid], function(err, data) {
						if(err) {
							res.send(400);
						}
						res.status(200).send(data.rows);
					});
				};
			},

		getExerciceById: function() {
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

		addExercice: function() {
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

		updateExercice: function() {
				return function(req, res){
					var exerciceName = req.body.nameExercice;
					var description = req.body.descExercice;
					var idexercice = req.params.idExerc;
					var idmachine = req.
					if(id == undefined || description == undefined || exerciceName == undefined){
						res.send(400);
					}
					pg.query('SELECT 1 FROM exercice WHERE idexercice=$1::int AND iduser=2::int',[idexercice, req.Tid], function(err, data){
					if(err || data.rows.length == 0){
							res.send(400);
						}
						pg.query('UPDATE exercice SET iduser=$1::int, idexercice=$2::int, idmachine=$3::int, nameexercice=$4::text, descexercice=$5::text', [req.Tid, idexercice, idmachine, exerciceName, description], 
								  function(err, data) {
										if(err) {
											res.send(400);
										}
										res.status(200).send("Machine " + machineName + " updated");
									});
					});
					
				};
			},

		deleteExercice: function() {
				return function(req, res){
					var id = req.params.id;
					if(id == undefined){
						res.send(400);
					}
					pg.query('SELECT 1 FROM exercice WHERE iduser=$1::int AND idexercice=$2::int', [req.Tid, id], function(err, data){
						if(err || data.rows.length){
							res.send(400);
						}
						pg.query('DELETE FROM exercice WHERE idexercice=$1::int', 
								  [id], 
								  function(err, data) {
										if(err) {
											res.send(400);
										}
										res.status(200).send({
											"status" : "success",
											"message" : "Exercice deleted"
										});
									});
					});
				};
			}
	}
	return exercice;
}
