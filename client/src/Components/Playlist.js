import React from 'react'
import {Link} from 'react-router-dom'

class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.state = {playlistFromDb : [],
            track : []
            }
    }

    async componentWillMount(){
        const API_URL = "http://localhost:3007/getTracks"
        await fetch(API_URL, {
            method: 'GET'})
            .then(response => response.json())
            .then(responseJSON => { this.processResults(responseJSON)})
    }

    processResults = (response) => {
        console.log(response)
        let rows = response.rows
        let list = rows.map(
            trackList =>
            <tr>
                <td >{trackList[2]}</td>
                <td >{trackList[1]}</td>
                <td >{trackList[3]}</td>
                <td ><button className="btn btn-danger" onClick={this.deleteTrack.bind(this,trackList)}>Delete</button></td>
            </tr>
        )

        this.setState( {
            track: list
        })
    }

    async deleteTrack(trackId)
    {
        //alert("works")
        //console.log(trackId)
        const API_URL = "http://localhost:3007/deleteTrack"
        const response = await fetch(API_URL, {
        method: 'DELETE',
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify(
            {
              'master_id':trackId[4]  }
            )});
            const result = await response.json()
            alert(result.message)
            const API_URL_fetch = "http://localhost:3007/getTracks"
           await fetch(API_URL_fetch, {
            method: 'GET'})
            .then(response => response.json())
            .then(responseJSON => { this.processResults(responseJSON)})

    }
    render(){
        return(
            <body>
                <nav className="topnav">
                        <Link to={{pathname: `/`}}>
                            <div className="playlist">Search</div>
                        </Link>
                    </nav>
                <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Playlist Id</th>
                        <th>URI</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.track}
                    </tbody>
                </table>
            </body>
        );
    }

}
export default Playlist;