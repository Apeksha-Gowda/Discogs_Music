import React from 'react';
import ReactDOM from 'react-dom';
import Discogs from './Components/Discogs'
import Playlist from './Components/Playlist'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render(
    <Router>
            <Switch>
                <Route path="/" exact component={Discogs}/>
                <Route path="/playlist" component={Playlist}/>
            </Switch>
    </Router>,
  document.getElementById('root')
);
