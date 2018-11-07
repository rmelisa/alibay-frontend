import React, {Component} from "react";
import { connect } from 'react-redux'
import {withRouter} from 'react-router'

class Authentication extends Component{
    constructor(props){
        super(props)
        this.state = {
            usernameInput : "",
            passwordInput : ""
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
            if (parsed.response.status) {
                this.props.dispatch({  // passing this action to the reducer by specifing the type of action
                    type: "setSession",
                    sessionID: parsed.response.sessionID

                })
                this.props.history.push('/')
            }else{
                alert('Failed login or signup, please try again')
            }
        }
        cb = cb.bind(this)
        fetch('http://demo5206055.mockable.io/' + this.props.endpoint,{
            method: 'POST',
            body: body // body is defined above
        }).then(function(res){
            return res.text()
        }).then(cb)
    }
    
    render(){
        return(<div>
        <form onSubmit={this.handleSubmit}>
            Username:
            <input type="text" onChange={this.handleUsernameChange}></input>
            Password:
            <input type="text" onChange={this.handlePasswordChange}></input>
            <input type ="submit"></input>
        </form></div>)
    }
}
let connectedAuthentication = connect()(withRouter(Authentication))
export default connectedAuthentication