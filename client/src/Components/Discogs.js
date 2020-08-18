import React from 'react'
import '../styles/Discogs.css'
import 'bootstrap/dist/css/bootstrap.css'

export default class Discogs extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            originalData:[],
            tracksJSX : [],
            trackImageJSX:[],
            search : ''
        }
    }


    updateSearch(event){
        this.setState({search:event.target.value})
        if(!this.state.search){
            this.newListUpdate(this.state.search.toLowerCase())
        }else{
            this.setState( {
                tracksJSX: []
            })
        }
    }

    newListUpdate(searchKey){
     // const url = `https://api.discogs.com/database/search?key=HnJirdOZRXtwJMrRdDOF&secret=VXtumhgYtfRNxIjmDEMwCObNAQLkSmSh&artist="${searchKey}"&country=canada`
      const url = "https://api.discogs.com/database/search?token=zphkcfEAuTormIOevmxnTRvkFGqndPzvQVKARnij&search="+searchKey
        console.log(url)
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(responseJSON => { this.processResults(responseJSON)})

    }

    processResults = (response) => {
        console.log(response)
        let filteredTracks = response.results.filter(
            (track) => {
                return track.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        );
        let tracks = filteredTracks.map(
            track =>
            <li>
                   <img src={track.cover_image} alt="prop" width="30" height="30"/>
               {track.title} <button onClick={this.selectedTrack.bind(this,track)}>+</button>
            </li>)

        this.setState( {
            tracksJSX: tracks
        })
    }

    async selectedTrack(track)
    {
        console.log("check");
        const API_URL = "http://localhost:3007/addTrack"
        const response = await fetch(API_URL, {
        method: 'POST',
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify(
            {'track':track}
            )});
        const result = await response.json()
        console.log(result);
    }

    render()
    {
        return(
            <>
                <body>
                    <input value={this.state.search} placeholder="Search..." onChange={this.updateSearch.bind(this)}/>
                    <i className="fa fa-search " />
                    <ul>
                        <li>
                            {this.state.tracksJSX}
                        </li>
                    </ul>
                </body>
            </>
        )
    }
}
