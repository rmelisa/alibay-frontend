import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'

class ShoppingCart extends Component {
    
    showItems(item){
        return(<div>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            </div>)
    }
    render() {
        return (<div className="shoppingCart">
            <div>{this.props.items.map(this.showItems)}</div>
            <Checkout/>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return { items: state.cartItems }
}

let connectedMapStateToStore = connect(mapStateToProps)(ShoppingCart)
export default connectedMapStateToStore;
