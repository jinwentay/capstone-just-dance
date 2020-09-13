var status = require('../status');
var successMessage = require('../status');
var errorMessage = require('../status');
var router = require('express').Router();//create route
var pool = require('../pool');
router.get("/hello", (req, res) => {
  res.status(200).send({ message: "Connected!" });
});
//get all users when it is localhost:5000/users/
router.route('/get/user').get((req, res) => {
  const queryText = `
    SELECT id, username
    FROM Users;`
    //WHERE username=$1 AND password=$2;`;
  
  pool.query(queryText, [req.query.username, req.query.password], (q_err, q_res) => {
    if (q_res.rowCount !== 0) {
      successMessage.data = q_res.rows;
      return res.status(status.success).send(successMessage);
    }
    if (q_err) {
      console.log("Error occurred", q_err)
      errorMessage.error = 'Account not found.';
      return res.status(status.notfound).send(errorMessage);
    }
  })
});

//create a user localhost:5000/users/add
router.route('/post/user').post((req, res) => {
  const username = req.body.username;
});

module.exports = router;