import React, {Component} from "react";
import { connect } from 'react-redux'

class Authentication extends Component{
    constructor(props){
        super(props)
        this.state = {
            usernameInput : "",
            passwordInput :""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleUsernameChange(event){
        this.setState({
            usernameInput : event.target.value
        })
    }
    handlePasswordChange(event){
        this.setState({
            passwordInput : event.target.value
        })

    }
    handleSubmit(event){
        event.preventDefault()
        let body = JSON.stringify({
            username: this.state.usernameInput,
            password: this.state.passwordInput
        })
        let cb = function(resBody){
            let parsed = JSON.parse(resBody)
           this.props.dispatch({  // passing this action to the reducer by specifing the type of action
               type: "setSessionId",
               id: parsed.id
           })
        }
        // cb = cb.bind(this)
        // fetch(this.props.endpoint,{
        //     method: 'POST',
        //     body: body // body is defined above
        // }).then(function(res){
        //     return res.text()
        // }).then(cb)
    }
    
    render(){
        return(
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleUsernameChange}></input>
            <input type="text" onChange={this.handlePasswordChange}></input>
            <input type ="submit"></input>
        </form>)
    }
}
let connectedAuthentication = connect()(Authentication)
export default connectedAuthentication