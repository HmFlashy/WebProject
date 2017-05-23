//Routes for the performances requests

module.exports = function(pg){

var performance = {
    getPerformances: function(req, res){
      pg.query('SELECT * \
            FROM performance \
            NATURAL JOIN training \
            WHERE iduser=$1::int',
              [req.Tid],
            function(err, data){
              if(err){
                return res.sendStatus(400);
              }
              return res.status(200).send(data.rows);
          });
  },

  getPerformanceById: function(req, res){
    var idperformance = req.params.id;
    if(idperformance == undefined){
      return res.send(400);
    }
    pg.query('SELECT p.*, idtraining, nametraining  \
          FROM performance p \
          NATURAL JOIN training\
          WHERE iduser=$1::int AND idperformance=$2::int',
            [req.Tid, idperformance],
          function(err, data){
            if(err){
              return res.sendStatus(400);
            }
            return res.status(200).send(data.rows);
        });
  },

  getStatistiques: function(req, res){
    pg.query('SELECT totalperformancesmonth, averagerating, nametraining, nbperformances \
              FROM (SELECT avg(rating) as averagerating FROM performance WHERE iduser=$1::int ) as a, \
              (SELECT count(idtraining) as totalperformancesmonth FROM performance p1 WHERE \
                    iduser=$1::int and \
                    (SELECT EXTRACT(month FROM CURRENT_DATE)) = (SELECT EXTRACT(month FROM (SELECT dateperf FROM performance p2 WHERE p1.idperformance = p2.idperformance)))) as b, \
              (SELECT nametraining, count(idperformance) as nbperformances \
                      FROM training NATURAL JOIN performance \
                      WHERE iduser =$1::int\
                      Group by idtraining, dateperf\
                      ORDER BY nbperformances, dateperf DESC \
                      LIMIT 1) as c',
              [req.Tid],
            function(err, data){
              if(err){
                console.log(err);
                return res.sendStatus(400);
              }
              return res.status(200).send(data.rows);
            })
  },

  addPerformance: function(req, res){
            var rating = req.body.rating;
            var comment = req.body.comment;
            var idtraining = req.params.idtraining;
            if(rating == undefined || comment == undefined || rating < 0 || rating > 10){
              return res.sendStatus(400);
            }
            pg.query('INSERT INTO performance (dateperf, rating, comment, iduser, idtraining) VALUES (CURRENT_DATE, $1::int, $2::text, $3::int, $4::int)',
                  [rating, comment, req.Tid, idtraining],
                  function(err, data){
                    if(err){
                      return res.sendStatus(err.http_code);
                    }
                    return res.status(200).send({
                      message: "Performance added"
                    })
                  });
          },

  deletePerformance: function(req, res){
            var id = req.params.id;
            pg.query('DELETE FROM performance WHERE idperformance=$1::int AND iduser=2::int',
                  [id, req.Tid],
                  function(err, data){
                    if(err){
                      return res.sendStatus(err.http_code);
                    }
                    return res.status(200).send({
                      status: true,
                      message: "Performance deleted"
                    })
                  });
            }
  }
  return performance;
}
