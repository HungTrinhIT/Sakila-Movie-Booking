const knex = require("knex")({
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "sakila",
      port: 3306,
    },
    pool: { min: 0, max: 50 },
  });
  
  module.exports = knex;
  