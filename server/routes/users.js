var status = require('../status');
var successMessage = require('../status');
var errorMessage = require('../status');
var router = require('express').Router();//create route
var pool = require('../pool');
router.get("/hello", (req, res) => {
  res.status(200).send({ message: "Connected!" });
});
//get all users when it is localhost:5000/users/
router.get('/get/user', (req, res) => {
  const queryText = `
    SELECT id, username
    FROM Users
    WHERE username=$1 AND password=$2;`;
  
  pool.query(queryText, [req.query.username, req.query.password], (q_err, q_res) => {
    if (q_err) {
      return res.status(404).send({ message: "Your account could not be found."});
    }
    if (q_res.rowCount !== 0) {
      res.json(q_res.rows);
    }
  });
});

//create a user localhost:5000/users/add
router.post('/post/user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const queryText = `INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING id
  `;
  (async () => {
    const client = await pool.connect();
    console.log("Connect to pool");
    try {
      await client.query("BEGIN");
      const id = await client.query(queryText, [username, password]);
      let message = "Your account already exists. Try login!";
      if (id.rowCount !== 0) {
        message = "Signup success!";
      }
      console.log(message);
      await client.query("COMMIT").then(res.send({ message: message }));
    } catch (err) {
      await client.query("ROLLBACK").then(res.send({ message: err.message }));
      throw err;
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack));
});

module.exports = router;