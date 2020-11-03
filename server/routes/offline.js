var router = require('express').Router();//create route
var pool = require('../pool');

router.get('/get/session/all/accuracy', (req, res) => {
  // console.log("Querying accuracy");
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
    // console.log(q_res.rows);
    res.send(q_res.rows);
  })
})

router.get('/get/session/all/numPositions', (req, res) => {
  const query = `SELECT P.sid, P.id, count(*) FROM position P GROUP BY P.sid, P.id ORDER BY P.sid`;
  pool.query(query, [], (q_err, q_res) => {
    res.status(200).send(q_res.rows);
  }); 
})

router.get('/get/session/:sid/accuracy', (req, res) => {
  const sid = req.query.sid;
  const id = req.query.id;
  const query = `SELECT count(*)
  FROM position P JOIN correct_positions C using(sid)
  WHERE P.value=C.value
  AND P.id=C.id
  AND P.sid=$1
  AND P.id=$2
  GROUP BY P.sid, P.id`;

  pool.query(query, [sid, id], (q_err, q_res) => {
    if (q_err) {
      res.status(404).send({ error: 'Unable to retrieve user accuracy' });
      return;
    }
    console.log("User accuracy: ", q_res.rows);
    res.status(200).send(q_res.rows);
  })
})

router.get('/get/session/:sid/numPositions', (req,res) => {
  const sid = req.params.sid;
  const id = req.query.id;
  const query = `SELECT index, P.value, C.value as correct
  FROM correct_positions C JOIN position P USING(index, sid) 
  WHERE P.sid=$1 AND P.id=$2 AND C.id=$2`;

  pool.query(query, [sid, id], (q_err, q_res) => {
    if (q_err) {
      res.status(404).send({ error: 'Unable to retrieve user positions' });
      return;
    }
    console.log("User positions: ", q_res.rows);
    res.status(200).send(q_res.rows);
  })
})

router.get('/get/session/danceMoves', (req,res) => {
  const sid = req.query.sid;
  const uid = req.query.uid;
  console.log(sid, uid);
  const query = `SELECT index, move 
  FROM dance
  WHERE sid=$1 AND id=$2`;
  
  pool.query(query, [sid, uid], (q_err, q_res) => {
    if (q_err) {
      res.status(404).send({ error: 'Session statistics not found' });
      return;
    }
    console.log("Session moves: ", q_res.rows);
    res.status(200).send(q_res.rows);
  })
})

router.get('/get/session/:uid', (req,res) => {
  const uid = req.params.uid;
  const query = `SELECT P.sid, date, starttime, endtime FROM participants P JOIN session S using(sid) WHERE id=$1`;
  pool.query(query, [uid], (q_err, q_res) => {
    if (q_err) {
      res.status(404).send({ error: 'Sessions participated not found' });
      return;
    }
    console.log("Sessions: ", q_res.rows);
    res.status(200).send(q_res.rows);
  })
})

module.exports = router;