import React from 'react'
import '../styles/Discogs.css'
import 'bootstrap/dist/css/bootstrap.css';


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
        //console.log(event.target.value)
            this.setState({search:event.target.value})
            this.newListUpdate(this.state.search.toLowerCase())

    }

    newListUpdate(searchKey){
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
        let tracks = filteredTracks.map( track => <li><img src={track.cover_image} alt="prop" width="30" height="30"/>{track.title}</li>)
        this.setState( {
            tracksJSX: tracks
        })
    }

    render()
    {

        return(
            <>
            <body>
                <form action="">
                    <input type="search" value={this.state.search} placeholder="Search..." onChange={this.updateSearch.bind(this)}/>
                    <i className="fa fa-search " />
                    <ul>
                        <li>
                            {this.state.tracksJSX}
                            </li>
                            </ul>

                </form>
            </body>
            </>


        )
    }
}