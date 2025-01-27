var dbConnection = {};

dbConnection = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  charset: process.env.CHARSET,
  pool: { maxConnections: 50, maxIdleTime: 60000 },
};

var dbConfig = {
  client: "mysql",
  connection: dbConnection,
};

var knex = require("knex")(dbConfig);

exports.knex = knex;
