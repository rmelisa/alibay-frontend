import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import Seller from './seller.js'
import { Route, BrowserRouter, Link } from 'react-router-dom'



class ItemDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {}
        }
    }
    componentDidMount() {

        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.setState({
                item: parsed
            })
        }
        callBack = callBack.bind(this)
        fetch('http://demo5206055.mockable.io/itemDetails', {
            method: 'POST',
            body: JSON.stringify({
                itemID: this.props.itemID
            })
        }).then(function (x) {
            return x.text()
        }).then(callBack)
    }

    getSellerDetail() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.props.dispatch({
                type: "setSessionId",
                id: parsed.id
            })
        }
        callBack = callBack.bind(this)
        fetch('/sellerDetail', {
            method: 'GET',

        }).then(function (x) {
            return x.text()
        }).then(callBack)
        
    }
    

    render() {
        return (
            <div className="flex-ItemDetails">

                <div>Item Details:</div>
                <div>
                    <img src={this.state.item.image}></img>
                    <div>Seller name:<Link to={"/seller/"}></Link></div>
                    {/* <div>Seller Reviews:{Reviews}</div> */}
                </div>
                <div>Title:{this.state.item.name}</div>
                <div>Price:{this.state.item.price}</div>
                <div>Details:{this.state.item.description}</div>
                <div>Seller: {this.state.item.seller}</div>
                <form>
                    <div className="button">
                        <input type="submit" />
                    </div>
                </form>
            </div>)
    }
}


let connectedItemDetails = connect()(ItemDetails)
export default connectedItemDetails