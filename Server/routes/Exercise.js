module.exports = function(pg){

	var exercise = {
		getExercises: function(req, res){
					pg.query('SELECT * FROM exercise NATURAL JOIN machine WHERE iduser=$1::int', [req.Tid], function(err, data) {
						if(err) {
							console.log(err);
							return res.send(400);
						}
						return res.status(200).send(data.rows);
					});
				},

		getExerciseById: function(req, res){
					var id = req.params.id;
					pg.query('SELECT * FROM exercise NATURAL JOIN machine WHERE idexercise=$1::int AND iduser=$2::int', [id, req.Tid], function(err, data) {
						if(err) {
							return res.send(400);
						}
						if(data.rows.length == 0){
							res.status(404).send("This Exercise does not exist");
						}
						return res.status(200).send(data.rows[0]);
					});
				},

		addExercise: function(req, res){
					var exerciseName = req.body.nameExerc;
					var description = req.body.descExerc;
					var idmachine = req.body.machine;
					if(description == undefined || exerciseName == undefined){
						return res.send(400);
					}
					pg.query("INSERT INTO exercise (nameexercise, descexercise, idmachine, iduser) VALUES ($1::text,$2::text, $3::int, $4::int) RETURNING *", 
						      [exerciseName, description, idmachine, req.Tid], 
						      function(err, data) {
									if(err) {
										console.log(err);
										return res.send(400);
									}
									return res.status(201).send(data);
								});
				},
		updateExercise: function(req, res){
					var exerciseName = req.body.nameExercise;
					var description = req.body.descExercise;
					var idexercise = req.params.idExerc;
					var idmachine = req;
					if(id == undefined || description == undefined || exerciseName == undefined){
						return res.send(400);
					}
					pg.query('UPDATE exercise SET iduser=$1::int, idexercise=$2::int, idmachine=$3::int, nameexercise=$4::text, descexercise=$5::text', 
						[req.Tid, idexercise, idmachine, exerciseName, description], 
							  function(err, data) {
									if(err) {
										return res.send(400);
									}
									return res.status(200).send("Machine " + machineName + " updated");
								});
					
				},

		deleteExercise: function(req, res){
					var id = req.params.id;
					if(id == undefined){
						return res.send(400);
					}
					pg.query('DELETE FROM exercise WHERE idexercise=$1::int AND iduser=$2::int', 
							  [id, req.Tid], 
							  function(err, data) {
									if(err) {
										return res.send(400);
									}
									return res.status(200).send({
										"status" : "success",
										"message" : "Exercise deleted"
									});
								});
				}
		}
	return exercise;
}
