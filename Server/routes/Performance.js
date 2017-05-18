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
                return res.send(err.http_code);
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
              return res.send(err.http_code);
            }
            return res.status(200).send(data.rows);
        });
  },

  //Get the last performances, a number in the query tells the number of rows to get
  getLastPerformances: function(req, res){
    var numberPerf = req.params.number;
    var offsetPerf = req.params.offset;
    if(numberPerf == undefined){
      return res.send(400);
    }
    pg.query('SELECT p.*, idtraining, nametraining  \
          FROM performance p \
          NATURAL JOIN training\
          WHERE iduser=$1::int LIMIT $3::int OFFSET $4::int',
            [req.Tid, idperformance, offsetPerf], 
          function(err, data){
            if(err){
              return res.send(err.http_code);
            }
            return res.status(200).send(data.rows);
        });
  },

  addPerformance: function(req, res){
            var rating = req.body.rating;
            var comment = req.body.comment;
            var idtraining = req.body.idtraining;
            if(rating == undefined || comment == undefined || rating < 0 || rating > 10){
              return res.send(400);
            }
            pg.query('INSERT INTO performance VALUES ($1::int, $2::text, $3::int, $4::int',
                  [rating, comment, req.Tid, idtraining],
                  function(err, data){
                    if(err){
                      return res.send(err.http_code);
                    }
                    return res.status(200).send({
                      status: true,
                      message: "Performance added"
                    })
                  });
          },

  deletePerformance: function(req, res){
            var id = req.params.id;
            pg.query('DELETE FROM performance WHERE idperformance=$1::int',
                  [id],
                  function(err, data){
                    if(err){
                      return res.send(err.http_code);
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