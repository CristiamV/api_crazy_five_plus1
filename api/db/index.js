const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'augere_db',
  database: 'augere',
  user: process.env.PGUSER || 'u_augere',
  password: process.env.PGPASSWORD || 'u_augere01*.,',
  port: process.env.PGPORT || 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}