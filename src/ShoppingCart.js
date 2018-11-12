import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'
import './ShoppingCart.css';

class ShoppingCart extends Component {


    constructor() {
        super()
        this.state = {

        }
        //     this.increaseItem = this.increaseItem.bind(this)
        //     this.decreaseItem = this.decreaseItem.bind(this)
        this.getTotal = this.getTotal.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }
    // increaseItem(event) {
    //     event.preventDefault()
    //     let newQuantity = this.state.quantity + 1
    //     this.setState({ quantity: newQuantity })

    // }
    // decreaseItem(event) {
    //     event.preventDefault()
    //     let newQuantity = this.state.quantity - 1
    //     this.setState({ quantity: newQuantity })
    // }

    getTotal() {
        let total = 0
        this.props.items.forEach(function (item) {
            let price = parseInt(item.price)
            total += price
        });
        return `${total} $`
        // for(let i=0; i<items.length; i++){
        //     total += items[i].price
        //     return total
    
}
backToHome(){
    this.props.history.push('/')
}
    showItems(item) {


        return (<div className="cart-items">
            
            <img className="cart-items" src={'/' + item.image}></img>
            <div className="cart-desc">
                <div className="cart-desc">Name: {item.name}</div>
                <div className="cart-desc">Description: {item.description}</div>
                <div className="cart-desc">Price: {item.price}$</div>
            </div>
        </div>)
    }
    render() {
        return (<div>
            <div className="shopping-cart">
                <img className="title-cart" src="/shabby.png"></img>
            </div>
            <p className="cart-title">SHOPPING CART</p>
            <button className="back-to-shop"onClick={this.backToHome}>Back to Shopping</button>
            <div >{this.props.items.map(this.showItems)}</div>

            {/* <input type="submit" value="+" onClick={this.increaseItem} />
            <input type="submit" value="-" onClick={this.decreaseItem} /> */}
            
          
            <div className="total-price">Total price:{this.getTotal(this.props.items)}</div>
            <Checkout />
        </div>)
    }
}
const mapStateToProps = (state) => {
    return { items: state.cartItems }
}

let connectedMapStateToStore = connect(mapStateToProps)(withRouter(ShoppingCart))
export default connectedMapStateToStore;
