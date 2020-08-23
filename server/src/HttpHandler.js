'use strict'
const path = require('path')
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'
const ERROR_CODE = 400
const client = require('../db/DbConnection')
const { create } = require('domain')

async function deleteTrackFromList(request,response)
{
    const track = request.body;
    console.log(track.id)
    const track_id = track.id
    await client.query({
        rowMode:'array',
        text: "delete from track where id="+track_id+""
    });
    response.json({
        status: HTTP_OK,
        message: "Record Deleted"
    })
}
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
        text: "select t.id,t.title,t.playlist_id,t.uri,p.title from track t left join "+
                "playlist p on t.playlist_id = p.id where p.title='"+request.params.playList+"'"
    })
    response.json({
        status: HTTP_OK,
        rows: trackList.rows
    })
}

async function getPlayList(request,response){
    console.log(response)
    console.log(request)
    let playlist = await client.query({
        rowMode:'array',
        text: "select id,title from playlist"
    })
    response.json({
        status: HTTP_OK,
        rows: playlist.rows
    })
}

function checkIfRequestIsEmpty(request){
    if(!JSON.stringify(request.body)){
        throw new Error("Request is empty")
    }
 }
module.exports ={
    addTrack,
    getTrackList,
    deleteTrackFromList,
    getPlayList
}