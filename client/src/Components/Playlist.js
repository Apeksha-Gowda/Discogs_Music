import React from 'react'
import {Link} from 'react-router-dom'
let discogs = require('./Discogs')

class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playlistFromDb : [],
            track : [],
            selectedPlayList:''
            }
    }

    async componentWillMount(){
        this.getPlayList();
    }

    async getPlayList(){
        const API_URL = "http://localhost:3007/getPlayList"
        await fetch(API_URL, {
            method: 'GET'})
            .then(response => response.json())
            .then(responseJSON =>{
                this.setState({
                    playlistFromDb:responseJSON.rows.map((item, i) => {
                                        return (
                                            <option key={i} value={item[1]}>{item[1]}</option>
                                        )
                                    }, this)
                })
            })
    }

    async selectedPlayList(event){
        this.setState({
            selectedPlayList:event.target.value
        })
        const API_URL = "http://localhost:3007/getTracks/"+event.target.value
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
                <td >{trackList[1]}</td>
                <td >{trackList[4]}</td>
                <td >{trackList[3]}</td>
                <td ><button className="btn btn-danger delete" onClick={this.deleteTrack.bind(this,trackList)}>Delete</button></td>
            </tr>
        )

        this.setState( {
            track: list
        })
    }

    async deleteTrack(trackId)
    {
        const API_URL = "http://localhost:3007/deleteTrack"
        const response = await fetch(API_URL, {
        method: 'DELETE',
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify(
            {
              'id':trackId[0]  }
            )});
            const result = await response.json()
            alert(result.message)

            const API_URL_fetch = "http://localhost:3007/getTracks/"+this.state.selectedPlayList
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
                <label className="playlistLabel">Choose Playlist: </label>
                <select className="playlistDropDown" onChange={this.selectedPlayList.bind(this)}>
                    <option key="0" value="">Choose</option>
                    {this.state.playlistFromDb}
                </select>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Playlist</th>
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