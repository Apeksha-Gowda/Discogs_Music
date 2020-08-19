import React from 'react'
import '../styles/Discogs.css'
import '../styles/Playlist.css'
import {Link} from 'react-router-dom'


export default class Discogs extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            originalData:[],
            tracksJSX : [],
            trackImageJSX:[],
            search : '',
            playlist:'',
            playlistFromDb:[]
        }
    }

    updateSearch(event){
        this.setState({search:event.target.value})
        if(event.target.value!==""){
            this.newListUpdate(this.state.search.toLowerCase())
        }else{
            this.setState( {
                tracksJSX: []
            })
        }
    }

    async newListUpdate(searchKey){const url = "https://api.discogs.com/database/search?token=zphkcfEAuTormIOevmxnTRvkFGqndPzvQVKARnij&search="+searchKey
        console.log(url)
        await fetch(url, { method: 'GET' })
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
                       {track.title}

                       <select className="select" onChange={this.selectPlaylistOption.bind(this)}>
                            <option key="0" value="">Choose</option>
                            <option key="1" value="Default">Default</option>
                            <option key="2" value="Acoustic">Acoustic</option>
                            <option key="3" value="Classic">Classic</option>
                            <option key="4" value="Country">Country</option>
                            <option key="5" value="Metal">Metal</option>
                            <option key="6" value="Pop/Dance">Pop/Dance</option>
                            <option key="7" value="Rock">Rock</option>
                       </select>

                    <button onClick={this.selectedTrack.bind(this,track)}>+</button>
            </li>)

        this.setState( {
            tracksJSX: tracks
        })
    }


    async selectedTrack(track)
    {
        if(!(this.state.playlist))
        {
            alert("Playlist type is not selected")
        }
        else
        {
        console.log("check");
        const API_URL = "http://localhost:3007/addTrack"
        const response = await fetch(API_URL, {
        method: 'POST',
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify(
            {'title':track.title,
              'uri' : track.uri,
              'playlist_id':this.state.playlist,
              'master_id':track.id  }
            )});
        const result = await response.json()
        alert(result.message)
        console.log(result);

        }
    }

    selectPlaylistOption(event){
        this.setState({
            playlist:event.target.options.selectedIndex
        })
        console.log("playlist selected ", this.state.playlist)
        console.log("option select" , event.target.value)
    }

    render()
    {
        return(
                <div>
                    <nav className="topnav">
                        <Link to={{pathname: `/playlist`, params:{name: this.state.playlistFromDb}}}>
                            <div className="playlist">Show playlist</div>
                        </Link>
                    </nav>
                    <main>
                        <input value={this.state.search} placeholder="Search..." onChange={this.updateSearch.bind(this)}/>
                        <i className="fas fa-search"/>
                        <ul>
                            <li>
                                {this.state.tracksJSX}
                            </li>
                        </ul>
                    </main>
                </div>
        )
    }
}