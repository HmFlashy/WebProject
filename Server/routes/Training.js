//Routes for the trainings requests

module.exports = function(pg){


    var training = {
        getTrainings: function(req, res){
            pg.query('SELECT idtraining, nametraining, desctraining, idexercise, nameexercise, numero, totaltime \
                    FROM training \
                    NATURAL JOIN (SELECT idtraining, sum(last) as totaltime FROM training natural join contain GROUP BY idtraining) as b \
                    NATURAL JOIN contain  \
                    NATURAL JOIN exercise \
                    WHERE iduser=$1::int \
                    ORDER BY idtraining, numero, nametraining, desctraining, idexercise, nameexercise, totaltime ',
                      [req.Tid],
                    function(err, data){
                      if(err){
        							return res.sendStatus(400);
                      }
                      return res.status(200).json(data.rows);
                  });
        },

        getTrainingById: function(req, res){
            var id = req.params.idtraining;
            if(id == undefined){
                return res.sendStatus(400);
            }
            pg.query('SELECT idtraining, nametraining, desctraining, idexercise, nameexercise, numero, last, totaltime, numbertimes, numbereachtime, namemachine \
                    FROM training \
                    NATURAL JOIN (SELECT idtraining, sum(last) as totaltime FROM training natural join contain WHERE idtraining=$2::int GROUP BY idtraining) as b \
                    NATURAL JOIN contain  \
                    NATURAL JOIN exercise e\
                    LEFT JOIN machine m ON e.idmachine = m.idmachine\
                    WHERE e.iduser=$1::int AND idtraining=$2::int \
                    ORDER BY idtraining, numero, nametraining, desctraining, idexercise, nameexercise, last, totaltime, numbertimes, numbereachtime, namemachine ',
                    [req.Tid , id],
                    function(err, data){
                        if(err){
                            return res.sendStatus(400);
                        }
                        if(data.rows.length == 0){
                          return res.sendStatus(401);
                        }
                        return res.status(200).json(data.rows);
                    });
        },

        addTraining: function(req, res){
            var nametraining = req.body.nameMach;
            var desctraining = req.body.descMach;
            if(nametraining == undefined || desctraining == undefined){
                return res.sendStatus(400);
            }
            pg.query('INSERT INTO training (nametraining, desctraining, iduser) VALUES ($1::text, $2::text, $3::int) RETURNING idtraining',
                [nametraining, desctraining, req.Tid],
                function(err, data){
                    if(err){
      							return res.sendStatus(400);
                    }
                    return res.status(200).send(data.rows);
                });
        },

        addTrainingExercise: function(req, res){
            var idtraining = req.params.idtraining;
            var idexercise = req.params.idexercise;
            var numero = req.body.numero;
            var last = req.body.last;
            var numbertimes = req.body.numbertimes;
            var numbereachtime = req.body.numbereachtime;
            pg.query('INSERT INTO contain (idexercise, idtraining, numero, last, numbertimes, numbereachtime) VALUES ($1::int, $2::int, $3::int, $4::int, $5::int, $6::int)',
                [idexercise, idtraining, numero, last, numbertimes, numbereachtime],
                function(err, data){
                    if(err){
      							return res.sendStatus(400);
                    }
                    return res.status(200).send({
                        message: "Training inserted"
                    });
                });
        },

        deleteTraining: function(req, res){
            var id = req.params.id;
            pg.query('DELETE FROM training WHERE idtraining=$1::int AND iduser=$2::int',
                  [id, req.Tid],
                  function(err, data){
                    if(err){
      							return res.sendStatus(400);
                    }
                    return res.status(200).send({
                      message: "Training deleted"
                    });
                  });
        }
    }
    return training;
}
