'use strict'
const express = require('express')
const app = express()
const port = 3007



app.listen(port, function () {
    console.log('server listening on : http://localhost:%s', port)
})