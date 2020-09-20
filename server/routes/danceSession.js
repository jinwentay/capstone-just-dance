var router = require('express').Router();//create route
var pool = require('../pool');

router.post('/create/session', (req, res) => {
  const queryText = `INSERT INTO Session(startTime)
    VALUES(date_trunc('second', NOW()))
    RETURNING sid
  `;
  const user = req.body.id;
  if (user) {
    (async () => {
      const client = await pool.connect();
      console.log("Connect to pool");
      try {
        await client.query("BEGIN");
        const data = (await client.query(queryText)).rows[0];//{ sid: 1 }
        console.log("SID", data.sid);
        await client.query(`INSERT INTO Participants(id, sid)
        VALUES($1, $2)`, [user, data.sid]);
        await client.query("COMMIT")
        res.send({ session: data.sid });
      } catch (err) {
        await client.query("ROLLBACK");
        res.send({ message: err.message });
        throw err;
      } finally {
        client.release();
      }
    })().catch(e => console.error(e.stack));
  } else {
    res.status(400).send({ error: 'User id not found when creating session.'})
  }
})

router.post('/join/session', (req) => {
  const sessionId = req.body.id;
  const userId = req.body.uid;
  pool.query(`INSERT INTO Participants(id, sid)
    VALUES($1, $2)
    RETURNING sid
    ON CONFLICT (id, sid)
    DO
      SELECT sid FROM Participants WHERE sid=$2`,
    [userId, sessionId],
    (q_err, q_res) => {
      console.log("JOIN SESSION", q_res.rows);
      q_res.json(q_res.rows);
    }
  );
})

router.post('/stop/session', (req, res) => {
  const sessionId = req.body.id;
  pool.query(`UPDATE Session
    SET endTime = date_trunc('second', NOW())
    WHERE sid = $1`, [sessionId],
    (q_err, q_res) => {
      if (q_err) {
        q_err.
        console.log(q_err);
        res.status(500).send({ error: 'An unexpected error occurred. Session could not be stopped.' })
      } else {
        console.log('Stop session success', q_res);
        res.status(200).send({ success: 'Success' });
      }
    }
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