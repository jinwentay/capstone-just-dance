var router = require('express').Router();//create route
var pool = require('../pool');

router.get('/get/session/all/accuracy', (req, res) => {
  console.log("Querying accuracy");
  const query = `SELECT P.sid, P.id, count(*) 
      FROM position P JOIN correct_positions C using(sid) 
      WHERE P.value=C.value 
      AND P.index=C.index 
      AND P.id=C.id 
      GROUP BY P.sid, P.id`
  pool.query(query, [], (q_err, q_res) => {
    if (q_err) {
      res.status(500).send({ error: 'An unexpected error occurred'});
      return;
    }
    console.log(q_res.rows);
    res.send(q_res.rows);
  })
})

router.get('/get/session/all/numPositions', (req, res) => {
  const query = `SELECT P.sid, P.id, count(*) FROM position P GROUP BY P.sid, P.id ORDER BY P.sid`;
  pool.query(query, [], (q_err, q_res) => {
    res.status(200).send(q_res.rows);
  }); 
})

module.exports = router;