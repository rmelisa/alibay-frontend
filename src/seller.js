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
        this.getAllReviews =this.getAllReviews.bind(this)
    }
    componentDidMount(){
        this.getAllReviews()
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
            review: this.state.reviewInput,
            username: this.props.username
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
    getAllReviews(){
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            console.log(parsed.result)
        }
        callBack = callBack.bind(this)
        fetch('/getAllReviews',{
            method: 'POST',
            body:JSON.stringify({
                username: this.props.username
            })
        }).then(function(x){
            return x.text()
        }).then(callBack)
    }

    render() {
        return (<div className="sellerPage">
            Seller name:
        <div>{this.state.usrernameInput}</div>
            Reviews:
        <div>{this.getAllReviews}</div>
            Add a review:
        <form onSubmit={this.handleSubmit}>
                <input type="textarea" onChange={this.handleReviewInput}></input>
                <input type="submit"/>
            </form>
        </div>)
    }
}
let connectedSeller = connect()(Seller)
export default connectedSeller
