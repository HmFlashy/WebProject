module.exports = function(pg){
    
    var training = {
        getTrainings: function(req, res){
            pg.query('SELECT idtraining, nametraining, desctraining, idexercise, nameexercise, numero, totaltime \
                    FROM training \
                    NATURAL JOIN (SELECT idtraining, sum(last) as totaltime FROM training natural join contain GROUP BY idtraining) as b \
                    NATURAL JOIN contain  \
                    NATURAL JOIN exercise \
                    WHERE iduser=$1::int',
                      [req.Tid], 
                    function(err, data){
                      if(err){
                        console.log(err);
                        return res.send(400);
                      }
                      return res.status(200).json(data.rows);
                  });
        },
        
        getTrainingById: function(req, res){
            
        },
        
        addTraining: function(req, res){
            var nametraining = req.body.nameMach;
            var desctraining = req.body.descMach;
            if(nametraining == undefined || desctraining == undefined){
                return res.send(400);
            }
            pg.query('INSERT INTO training (nametraining, desctraining, iduser) VALUES ($1::text, $2::text, $3::int) RETURNING idtraining',
                [nametraining, desctraining, req.Tid],
                function(err, data){
                    if(err){
                        console.log(err);
                        return res.send(400);
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
                        console.log(err);
                    }
                    return res.send(200);
                });
        },
        
        updateTraining: function(req, res){
            
        },
        
        deleteTraining: function(req, res){
            
        }
    }
    return training;
}
