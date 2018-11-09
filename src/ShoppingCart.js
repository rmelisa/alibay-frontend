import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'

class ShoppingCart extends Component {
    
    showItems(item){
        return(<div>
            <img src={'/' + item.image}></img>
            <div>Name: {item.name}</div>
            <div>Description: {item.description}</div>
            <div>Price: {item.price}$</div>
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
