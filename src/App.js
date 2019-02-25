import React, { Component } from 'react';
import Gatekeeper from './components/Gatekeeper';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route name="home" exact path="/" component={Gatekeeper}/>
            <Route name="callback" path="/callback/" component={Gatekeeper}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
