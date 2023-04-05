const { Pool } = require("pg");

const pool = new Pool({
  host: "db.jpxyqjukkahgydbmgfog.supabase.co",
  user: "postgres",
  database: "postgres",
  password: "teamgakjelas69",
  port: 5432,
});

module.exports = pool;
