require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    // connection: {
    //   host: process.env.DB_HOST || '127.0.0.1',
    //   port: process.env.DB_PORT || 5432,
    //   database: process.env.DB_NAME || 'my_db',
    //   user:     process.env.DB_USER || 'postgres',
    //   password: process.env.DB_PASSWORD || 'password'
    // },
    // connection:process.env.connectionString,
    connection:'postgresql://postgres:root@localhost:5432/sms_db',
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations' // Tracks migration history in DB
    },
    seeds: {
      directory: './seeds'
    }
  }
};