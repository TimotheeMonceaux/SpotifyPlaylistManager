import React, { Component } from 'react';
import Controller from './components/Controller';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route name="home" exact path="/" component={Controller}/>
            <Route name="callback" path="/callback/" component={Controller}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
