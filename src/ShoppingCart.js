import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

class ShoppingCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item :{}
        }

    }
    render() {
        return (<div className="shopping-cart">
            <div></div>
        </div>)
    }
}