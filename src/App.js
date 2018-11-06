import React, { Component } from 'react';
import './App.css';
import Authentication from './Authentication.js'
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './Home.js'

class App extends Component {
  renderLogin(routerData) {
    return (<Authentication endpoint = {'/login'} />)
  }

  renderSignup(routerData) {
    return (<Authentication endpoint= {'/signup'} />)
  }

  renderHome(routerData) {
    return (<Home/>)
  }

  renderDetails(routerData) {
    let itemID = routerData.match.params.itemID;
    return //to be coded
  }


  renderAddItem(routerData) {
    return //to be coded
  }

  

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/home/' render={this.renderHome} />
          <Route exact={true} path='/login/' render={this.renderLogin} />
          <Route exact={true} path='/signup/' render={this.renderSignup} />
          <Route exact={true} path='/addItem/' render={this.renderAddItem} />
          <Route exact={true} path= '/details/:itemID' render={this.renderDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
