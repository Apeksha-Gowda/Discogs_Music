'use strict'
const path = require('path')
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'
const ERROR_CODE = 400
const client = require('../db/DbConnection')

async function addTrack(request,response){
    const track = request.body;
    console.log("***********", track)
    const {title, master_id, uri, playlist_id} = track;
    console.log(title, master_id ,uri, playlist_id);

    let newTrack = await client.query(
        "INSERT INTO track ( title, uri, master_id, playlist_id ) VALUES ($1, $2, $3, $4) RETURNING * ", [title, uri,master_id, playlist_id]
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