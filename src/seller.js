import React, { Component } from 'react';
import './App.css';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Seller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usrernameInput: "",
            reviewInput: ""
        }
        this.handleUsernameInput = this.handleUsernameInput.bind(this)
        this.handleReviewInput = this.handleReviewInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUsernameInput(event) {
        this.setState({
            usrernameInput: event.target.value
        })
    }
    handleReviewInput(event) {
        this.setState({
            reviewInput: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        let body = JSON.stringify({
            usrername: this.state.usrernameInput,
            review: this.state.reviewInput
        })
        let callBack = function (response) {
            let parsed = JSON.parsed(response)
            this.props.dispatch({
                // need an action with this type in the reducer
                type: "setSessionId",
                id: parsed.id
            })
        }
        callBack = callBack.bind(this)
        fetch('/addReview', { //need an endpoint in server.js 
            method: 'POST',
            body: body // body is defined above
        }).then(function (res) {
            return res.text()
        })

    }

    render() {
        return (<div className="sellerPage">
            Seller name:
        <div>{this.state.usrernameInput}</div>
            Reviews:
        <div>{this.allReviews}</div>
            Add a review:
        <form onSubmit={this.handleSubmit}>
                
                <input type="text" onChange={this.handleUsernameInput}></input>
                <input type="textarea" onChange={this.handleReviewInput}></input>
                <input type="submit"/>
            </form>
        </div>)
    }
}
let connectedSeller = connect()(Seller)
export default connectedSeller
