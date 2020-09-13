const express = require('express');
const cors = require('cors');
const pool = require('./pool');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//connect to postgresql
pool.connect(() => console.log("Pool Connected"));
//connect routes
const usersRouter = require('./routes/users');
app.use('/', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
