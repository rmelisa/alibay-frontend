import React, {Component} from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'

class AddItem extends Component {

    render() {
        return (<div>
            <div>Add item for sale</div>
            <form>
                
            </form>


        </div>)
    }
}

let connectedAddItem = connect()(AddItem)
export default connectedAddItem