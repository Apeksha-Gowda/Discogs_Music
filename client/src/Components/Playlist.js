import React from 'react';


class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.state = {playlistFromDb : []}
    }

    async componentWillMount(){
        const API_URL = "http://localhost:3007/getTracks"
        const response = await fetch(API_URL, {
            method: 'GET',
            headers:{"Content-Type" : "application/json"}});
            const result = await response.json()
             this.setState({playlistFromDb:result.rows})
             console.log(this.state.playlistFromDb)
    }
    render(){
        return(
            <div>
                {this.state.playlistFromDb}
            </div>
        );
    }

}
export default Playlist;