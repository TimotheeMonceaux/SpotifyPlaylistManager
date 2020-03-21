import React, { Component } from 'react';
import Gatekeeper from './components/gatekeeper/Gatekeeper';
import LibraryController from './components/library/LibraryController';
import DuplicatesController from './components/duplicates/DuplicatesController';
import OOLController from './components/ool/OOLController';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route name="home" exact path="/" component={Gatekeeper}/>
            <Route name="callback" path="/callback/" component={Gatekeeper}/>
            <Route name="library" path="/library/" component={LibraryController}/>
            <Route name="duplicates" path="/duplicates/" component={DuplicatesController}/>
            <Route name="ool" path="/ool/" component={OOLController}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
