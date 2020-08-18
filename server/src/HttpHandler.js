'use strict'
const path = require('path')
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'
const ERROR_CODE = 400
const client = require('../db/DbConnection')

async function addTrack(request,response){
    const track = request.body;
    const {title, id, uri} = track.track;
    console.log(title, id, uri);

    let newTrack = await client.query(
        "INSERT INTO track ( id ,title, uri, master_id ) VALUES ($1, $2, $3, $4) RETURNING * ", [id, title, uri, 123]
    );
    console.log(newTrack)
}

function checkIfRequestIsEmpty(request){
     if(!JSON.stringify(request.body)){
         throw new Error("Request is empty")
     }
 }
module.exports ={
    addTrack
}