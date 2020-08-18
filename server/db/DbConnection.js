const { Client } = require('pg')

client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'tp_music',
    user: 'postgres',
    password: 'postgres'
 })

 client.connect();

 client.query('SELECT * from playlist', (err, res) => {
    console.log(err, res)
    client.end()
  })