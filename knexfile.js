require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST ,
      port: process.env.DB_PORT ,
      database: process.env.DB_NAME ,
      user:     process.env.DB_USER ,
      password: process.env.DB_PASSWORD 
    },
    // connection:process.env.connectionString,
    // connection:'postgresql://postgres:root@localhost:5432/sms_db',
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations' // Tracks migration history in DB
    },
    seeds: {
      directory: './seeds'
    }
  }
};