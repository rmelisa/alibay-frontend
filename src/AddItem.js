import React, {Component} from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import {withRouter} from 'react-router'

class AddItem extends Component {
    constructor(){
        super()
        this.state={
            filename: '/placeholder.png',
            name: '', 
            price: null,
            description: '',
            sessionID: undefined
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleSubmit(event){
        event.preventDefault()
        this.setState({sessionID: this.props.sessionID})
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

    render() {
        return (<div>
            <div>Add item for sale</div>
            <form onSubmit={this.handleSubmit}> 
                <img src={this.state.filename}></img>
                <div>Upload image: <input type="file" id="input" onChange={e => this.uploadFile(e.target.files[0])} /> </div>
                <div>Name: <input type='text' onChange={this.handleNameChange}/></div>
                <div>Price: <input type='text' onChange={this.handlePriceChange}/></div>
                <div>Description: <input type='text' onChange={this.handleDescriptionChange}/></div> 
                <div><input type='submit'/></div>  
            </form>


        </div>)
    }
}

let connectedAddItem = connect(function(store){
    return {sessionID: store.session
            }
  })(withRouter(AddItem))
export default connectedAddItem