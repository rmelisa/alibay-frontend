import React, { Component } from 'react';
import './App.css';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class Seller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewInput: "",
            reviews: []
        }
        this.handleUsernameInput = this.handleUsernameInput.bind(this)
        this.handleReviewInput = this.handleReviewInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAllReviews =this.getAllReviews.bind(this)
        this.renderReviews = this.renderReviews.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }
    componentDidMount() {
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
            let parsed = JSON.parse(response)
            if (parsed.status) {
                this.getAllReviews()
            }
            
        }
        callBack = callBack.bind(this)
        fetch('/addReview', { //need an endpoint in server.js 
            method: 'POST',
            body: body // body is defined above
        }).then(function (res) {
            return res.text()
        }).then(callBack)

        this.setState({reviewInput: ''})

    }
    getAllReviews() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.setState({reviews: parsed.result})
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

    renderReviews(review){
        return (
            <li>{review}</li>
        )
    }
    backToHome(){
        this.props.history.push('/')
    }

    render() {
        return (<div className="sellerPage">
            Seller name:
        <div>{this.state.usrernameInput}</div>
            Reviews:
        <div>Reviews: <ul>{this.state.reviews.map(this.renderReviews)}</ul></div>
            Add a review:
        <form onSubmit={this.handleSubmit}>
                <input type="textarea" onChange={this.handleReviewInput}></input>
                <input type="submit" />
        </form>
        <button onClick={this.backToHome}>Back to Shopping</button>
        </div>)
    }
}
let connectedSeller = connect()(withRouter(Seller))
export default connectedSeller
