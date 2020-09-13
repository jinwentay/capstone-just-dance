const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: `${process.env.RDS_USERNAME}`,
  host: `${process.env.RDS_HOSTNAME}`,
  database: `${process.env.RDS_DB_NAME}`,
  password: `${process.env.RDS_PASSWORD}`,
  port: 5433,
});

module.exports = pool;