'use strict'
const path = require('path')
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'
const ERROR_CODE = 400
const client = require('../db/DbConnection')

async function addTrack(request,response){
    checkIfRequestIsEmpty(request)
    const track = request.body;
    console.log("***********", track)
    const {title, master_id, uri, playlist_id} = track;
    console.log(title, master_id ,uri, playlist_id);
    let checkIfRecordExist = await client.query({
        rowMode:'array',
        text: "select * from track where title='"+title+"' and playlist_id="+playlist_id+""
    })
   if(checkIfRecordExist.rows.length == 0 || checkIfRecordExist.rows == undefined){
        let newTrack = await client.query(
            "INSERT INTO track ( title, uri, master_id, playlist_id ) VALUES ($1, $2, $3, $4) RETURNING * ", [title, uri,master_id, playlist_id]
        );
        response.json({
            status: HTTP_OK,
            message: "Record added successfully!"
        })
   }else{
        response.json({
            status: ERROR_CODE,
            message: "Record already exist!"
        })
   }
}

async function getTrackList(request, response)
{
    console.log(response)
    console.log(request)
    let trackList =await client.query({
        rowMode:'array',
        text: "select * from track"
    })
    response.json({
        status: HTTP_OK,
        rows: trackList.rows
    })
}

function checkIfRequestIsEmpty(request){
    if(!JSON.stringify(request.body)){
        throw new Error("Request is empty")
    }
 }
module.exports ={
    addTrack,
    getTrackList
}