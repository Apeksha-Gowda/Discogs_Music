const { Client } = require('pg');

client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'tp_music',
    user: 'postgres',
    password: 'postgres'
 })

 client.connect();
 module.exports = client;
