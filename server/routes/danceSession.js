var router = require('express').Router();//create route
var pool = require('../pool');
var app = require('../index');
var redis = app.redis_client;
var helper = require('../script.store');

router.post('/create/session', (req, res) => {
  const queryText = `INSERT INTO Session(startTime)
    VALUES(date_trunc('second', NOW()))
    RETURNING sid
  `;
  const user = req.body.id;
  const device = req.body.device;
  if (user) {
    (async () => {
      const client = await pool.connect();
      console.log("Connect to pool");
      try {
        await client.query("BEGIN");
        const {rows, rowCount} = await client.query(queryText);//{ sid: 1 }
        console.log('CREATE SESSION DATA', rows);
        if (rowCount) {
          await client.query(`INSERT INTO Participants(id, sid, device)
          VALUES($1, $2, $3)`, [user, rows[0].sid, device]);
          await client.query("COMMIT").then(() => {
            res.send({ session: rows[0].sid });
            redis.HMSET('session', {
              'id': `${rows[0].sid}`, 
              'isStart': 'true'
            });
          })
        } else {
          throw new Error('no session id')
        }
        redis.HGET('session', 'id', (err, reply) => {
          console.log(reply);
        });
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      } finally {
        client.release();
      }
    })().catch(e => console.error(e.stack));
  } else {
    res.status(400).send(JSON.stringify({ error: 'User id not found when creating session.'}))
  }
})

router.post('/join/session', (req, res) => {
  const sessionId = req.body.id;
  const userId = req.body.uid;
  const device = req.body.device;
  console.log('device', device);
  ;(async () => {
    const client = await pool.connect();
    console.log("Connect to pool");
    const insertQuery = `INSERT INTO Participants(id, sid, device)
    VALUES($1, $2, $3)
    ON CONFLICT (id, sid)
    DO NOTHING
    RETURNING sid`
    try {
      await client.query("BEGIN");
      const { rows } = await client.query(insertQuery, [userId, sessionId, device]);//
      const users = await client.query(`SELECT id, username, device FROM Participants JOIN Users using(id) WHERE sid=$1`, [sessionId]);
      await client.query("COMMIT");
      res.send(users.rows);
      redis.HMSET('session', {
        'id': `${sessionId}`, 
        'isStart': 'true'
      });
      console.log("USERS", users.rows);
    } catch (err) {
      await client.query("ROLLBACK");//.then(res.status(500).send(JSON.stringify({ error: 'Unable to join session' })));
      throw err;
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack));
})

router.post('/stop/session', (req, res) => {
  const sessionId = req.body.id;
  console.log('Session id', sessionId);
  ;(async () => {
    const client = await pool.connect();
    console.log('Pool connected!');
    try {
      await client.query("BEGIN");
      await client.query(`UPDATE Session
      SET endTime = date_trunc('second', NOW())
      WHERE sid = $1`, [sessionId]);
      helper.storePositions(async function(query) {
        console.log(query);
        if (query)
          await client.query(query)
      });
      await client.query("COMMIT").then(() => {
        redis.HSET('session', 'isStart', 'false');
        res.status(200).send({ success: 'Success' });
      });
      redis.DEL('position');
    } catch (err) {
      await client.query("ROLLBACK")//.then(res.status(500).send({ error: 'An unexpected error occurred. Session could not be stopped.' }));
      throw err;
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack));
  // pool.query(`UPDATE Session
  //   SET endTime = date_trunc('second', NOW())
  //   WHERE sid = $1`, [sessionId],
  //   (q_err, q_res) => {
  //     if (q_err) {
  //       q_err.
  //       console.log(q_err);
  //       res.status(500).send({ error: 'An unexpected error occurred. Session could not be stopped.' })
  //     } else {
  //       console.log('Stop session success', q_res);
  //       res.status(200).send({ success: 'Success' });
  //       redis.HSET('session', 'isStart', 'false');
  //     }
  //   }
  // );
})

router.get('/get/session', (req, res) => {
  pool.query(`SELECT sid
    FROM Session
    WHERE endTime is null
  `, [],
  (q_err, q_res) => {
    res.send(q_res.rows);
    console.log(q_res.rows);
  })
})

module.exports = router;