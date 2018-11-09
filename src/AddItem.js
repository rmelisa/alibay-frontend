import React, {Component} from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import {withRouter} from 'react-router'

class AddItem extends Component {
    constructor(props){
        super(props)
        this.state={
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
        fetch('/pics?ext=' + fileExtension,{method: "POST", body: x})
        .then(function(res){
            return res.text()
        }).then(function(res){
            let parsed = res//check what is being sent back
            this.setState({filename: parsed})
        }.bind(this))
    }

    handleNameChange(event){
        let name = event.target.value
        this.setState({
            name: name
        })
    }

    handlePriceChange(event){
        let price = event.target.value
        this.setState({
            price: price
        })
    }

    handleDescriptionChange(event){
        let description = event.target.value
        this.setState({
            description: description
        })
    }

    handleCategory(event){
        let category = event.target.value
        this.setState({
            category: category
        })
    }

    handleSubmit(event){
        event.preventDefault()
        fetch('/addItem', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(function(res){
            return res.text()
        }).then(function(res){
            let parsed = JSON.parse(res)//check what is being sent back
            if(parsed.status){
                alert('item added succesfully')
                this.props.history.push('/')
            }else {
                alert('item was not added succesfully, please try again')
            }
        }.bind(this))
    }

    backToHome(){
        this.props.history.push('/')
    }

    render() {
        return (<div>
            <div>Add item for sale</div>
            <form onSubmit={this.handleSubmit}> 
                <img src={`/${this.state.filename}`}></img>
                <div>Upload image: <input type="file" id="input" onChange={e => this.uploadFile(e.target.files[0])} /> </div>
                <div>Name: <input type='text' onChange={this.handleNameChange}/></div>
                <div>Price: <input type='text' onChange={this.handlePriceChange}/></div>
                <div>Description: <input type='text' onChange={this.handleDescriptionChange}/></div>
                <div>Choose category:
                    <select onChange={this.handleCategory}>
                        <option value="clothing">Clothing</option>
                        <option value="home">Home</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </div> 
                <div><input type='submit'/></div>  
                <button onClick={this.backToHome}>Back to Shopping</button>
            </form>


        </div>)
    }
}

let connectedAddItem = connect(function(store){
    return {
        sessionID: store.session,
        username: store.username
            }
  })(withRouter(AddItem))
export default connectedAddItem