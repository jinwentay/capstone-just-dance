var router = require('express').Router();//create route
var pool = require('../pool');

router.post('/create/session', (req, res) => {
  const queryText = `INSERT INTO Session(startTime)
    VALUES(date_trunc('second', NOW()))
    RETURNING sid
  `;
  const user = req.body.id;
  (async () => {
    const client = await pool.connect();
    console.log("Connect to pool");
    try {
      await client.query("BEGIN");
      const sid = (await client.query(queryText)).rows[0];
      console.log("SID", sid);
      await client.query(`INSERT INTO Participants(id, sid)
      VALUES($1, $2)`, [user, sid]);
      await client.query("COMMIT").then(res.send({ 
        session: sid
      }));
    } catch (err) {
      await client.query("ROLLBACK").then(res.send({ message: err.message }));
      throw err;
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack));
})

// router.post('/join/session', (req, res) => {
//   const sessionId = req.body.id;
//   pool.query(`INSERT INTO Participants(id, sid)
//   VALUES($1, $2)
//   RETURNING sid
//   ON CONFLICT (id, sid)
//   DO
//     SELECT sid FROM Participants 
// })

router.post('/stop/session', (req, res) => {
  const sessionId = req.body.id;
  pool.query(`UPDATE Session
    SET endTime = date_trunc('second', NOW())
    WHERE sid = $1`, [sessionId]
  );
})

router.get('/get/session', (req, res) => {
  pool.query(`SELECT sid
    FROM Session
    WHERE endTime is null
  `, [],
  (q_err, q_res) => {
    q_res.json(q_res.rows);
  })
})

module.exports = router;