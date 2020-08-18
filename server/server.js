'use strict'
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3007
const httpHandler = require('./src/HttpHandler')

app.use(cors())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/addTrack', httpHandler.addTrack)

app.listen(port, function () {
    console.log('server listening on : http://localhost:%s', port)
})