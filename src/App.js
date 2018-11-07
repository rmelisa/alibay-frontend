import React, { Component } from 'react';
import './App.css';
import Authentication from './Authentication.js'
import Seller from './seller.js'
import ItemDetails from './ItemDetails.js'
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './Home.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      showLogin: false
    }
  }

  renderLogin(routerData) {
   // this.setState({showLogin: true})
    return (<Authentication endpoint = {'/login'} />)
  }

  renderSignup(routerData) {
    //this.setState({showLogin: true})
    return (<Authentication endpoint= {'/signup'} />)
  }

  renderHome(routerData) {
    return (<Home/>)
  }

  renderDetails(routerData) {
    let itemID = routerData.match.params.itemID;
   //to be coded
   return (<ItemDetails endpoint={'/details'}/>)
  }


  renderAddItem(routerData) {
    return //to be coded
  }
  renderSeller(){
    return (<Seller endpoint={'/seller'}/>)
}
  

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/home/' render={this.renderHome} />
          <Route exact={true} path='/login/' render={this.renderLogin} />
          <Route exact={true} path='/signup/' render={this.renderSignup} />
          <Route exact={true} path='/addItem/' render={this.renderAddItem} />
          <Route exact={true} path='/seller/' render={this.renderSeller}/>
          <Route exact={true} path= '/details/:itemID' render={this.renderDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
