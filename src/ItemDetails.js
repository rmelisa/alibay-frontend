import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

class ItemDetails extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
        
    }
    getItemDetails(){

        let callBack = function(response){
            let parsed = JSON.parsed(response)
            this.props.dispatch({
                type: "setItemID",
                id: parsed.id
            })
        }
        callBack = callBack.bind(this)
        fetch('/getItemDetails',{
            method: 'GET'
        }).then(function(x){
            return x.text()
        }).then(callBack)
    }

    render(){
        return(<div className="flex-ItemDetails">
        <div>Item Details:{this.getItemDetails}</div>
        <div>
            <img src={this.props.image}></img>
            <div>Seller:{this.props.seller}</div>
            {/* <div>Seller Reviews:{Reviews}</div> */}
        </div>
        <div>
            <div>Title:{this.props.title}</div>
            <div>Price:{this.props.price}</div>
            <div>Details:{this.props.details}</div>
            <input type="sumbit">Add to cart</input>
        </div>
        </div>)
    }
}
    
    
let connectedItemDetails = connect()(ItemDetails)
export default connectedItemDetails