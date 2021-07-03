const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'test',
  // host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // port: process.env.DB_PORT,
  // database: process.env.DB_DATABASE,
});

client.on('connect', () => {
  console.log('Database connected');
});
client.on('end', () => {
  console.log('Database connection ended');
});

module.exports = client;
