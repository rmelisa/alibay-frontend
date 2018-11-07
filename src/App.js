import React, { Component } from 'react';
import './App.css';
import Authentication from './Authentication.js'
import Seller from './seller.js'
import ItemDetails from './ItemDetails.js'
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './Home.js'
import AddItem from './AddItem.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogin: false
    }
    this.renderAddItem = this.renderAddItem.bind(this)
  }

  renderLogin(routerData) {
   //this.setState({showLogin: true})
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
    return (<ItemDetails itemID={itemID}/>)
  }


  renderAddItem(routerData) {
    return (<AddItem/>)
    
  }
  renderSeller(){
    return (<Seller endpoint={'/seller'}/>)
}
  

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={this.renderHome} />
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

let connectedApp = connect(function(store){
  return {sessionID: store.session
          }
})(App)
export default connectedApp;
