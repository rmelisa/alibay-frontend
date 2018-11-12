import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './AddItem.css';

class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: 'placeholder.png',
            name: '',
            price: null,
            description: '',
            sessionID: props.sessionID,
            category: 'clothing',
            username: props.username
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }

    uploadFile(x) {
        var filename = x.name;
        var fileExtension = filename.split('.').pop();
        fetch('/pics?ext=' + fileExtension, { method: "POST", body: x })
            .then(function (res) {
                return res.text()
            }).then(function (res) {
                let parsed = res//check what is being sent back
                this.setState({ filename: parsed })
            }.bind(this))
    }

    handleNameChange(event) {
        let name = event.target.value
        this.setState({
            name: name
        })
    }

    handlePriceChange(event) {
        let price = event.target.value
        this.setState({
            price: price
        })
    }

    handleDescriptionChange(event) {
        let description = event.target.value
        this.setState({
            description: description
        })
    }

    handleCategory(event) {
        let category = event.target.value
        this.setState({
            category: category
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('/addItem', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(function (res) {
            return res.text()
        }).then(function (res) {
            let parsed = JSON.parse(res)//check what is being sent back
            if (parsed.status) {
                alert('item added succesfully')
                this.props.history.push('/')
            } else {
                alert('item was not added succesfully, please try again')
            }
        }.bind(this))
    }

    backToHome() {
        this.props.history.push('/')
    }

    render() {
        return (<div>
            <div className="nav-add">

                <img className="title-add" src="/shabby.png"></img>
            </div>
            <button className="keep-shopping" onClick={this.backToHome}>Continue Shopping</button>
            <form className="form-style" onSubmit={this.handleSubmit}>
            <div className="add-details">
                <div className="add-image">
                    <img className="add-image" src={`/${this.state.filename}`}></img>
                </div>
                    <div className="file-input">
                    <input id="hide" type="file" onChange={e => this.uploadFile(e.target.files[0])} /> 
                    </div>
                    <div><input className="input-field" type='text' onChange={this.handleNameChange} placeholder="Item Name" /></div>
                    <div><input className="input-field" type='text' onChange={this.handlePriceChange} placeholder="Item Price"/></div>
                    <div><input className="input-field" type='text' onChange={this.handleDescriptionChange} placeholder="Item Description" /></div>
                    <div>
                    <select className="category-select"onChange={this.handleCategory}>
                            <option value="clothing">Clothing</option>
                            <option value="home">Equipment</option>
                            <option value="electronics">Accessories</option>
                        </select>
                    </div>
                    <div><input className="add-item-btn" type='submit' value="Add Item" /></div>
                </div>
            </form>


        </div>)
    }
}

let connectedAddItem = connect(function (store) {
    return {
        sessionID: store.session,
        username: store.username
    }
})(withRouter(AddItem))
export default connectedAddItem