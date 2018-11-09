import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './home.css';
import { withRouter } from 'react-router'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'all', //need to agree on categories
            searchInput: '', 
            itemsDisplayed: []
        }
        this.getItems = this.getItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleShoppingCart = this.handleShoppingCart.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    }

    componentDidMount() {
        this.getItems()
    }


    getItems() {
       
        fetch("/getAllItems") //confirm name
            .then(function (x) {
                return x.text()
            })
            .then(function (response) {
                let parsedResponse = JSON.parse(response);
                if (this.state.category === 'all') {
                    this.setState({ itemsDisplayed: parsedResponse.result })
                    return
                }
                let itemsArr = parsedResponse.result.filter(function (item) {
                    return item.category === this.state.category
                }.bind(this))
                this.setState({ itemsDisplayed: itemsArr })//need to return array of items from server
            }.bind(this))
            .catch(err => console.log(err));


    }

    renderItems(item) {
        //check that the variable names match what gets returned from the fetch, example image, itemID, price, description
        return (<div className='items'>
            <img src={item.image}></img>
            <div>
                <div>Product name: <Link to={"/details/" + item.itemID}>{item.name}</Link> </div>
                <div>Price: {item.price}$</div>
                <div>Description: {item.description}</div>
            </div>
        </div>)
    }

    handleAddItem() {
        if (this.props.sessionID) {
            this.props.history.push('/addItem/')
        } else {
            alert('You must be logged in to add an item')
        }

    }

    handleShoppingCart(){
        if (this.props.sessionID) {
            this.props.history.push('/cart/')
        } else {
            alert('You must be logged in to access shopping cart')
        }
    }

    handleSearchChange(event) {
        let search = event.target.value
        this.setState({searchInput:search})
    }

    handleSearchSubmit(event) {
        event.preventDefault()
        fetch('/search', {
            method: 'POST',
            body:JSON.stringify({
                query: this.state.searchInput
            })
        }).then(function (x) {
            return x.text()
        }).then(function(res){
            let parsed = JSON.parse(res)
            this.setState({ itemsDisplayed: parsed })
        }.bind(this))
        this.setState({searchInput: ''})
    }

    render() {

        return (
            <div className='homepage'>
                <div>
                    <Link to={"/login/"}> Login </Link>
                    <Link to={"/signup/"}> Signup </Link>
                </div>
                <div>Alibay logo here</div>
                <div>
                    <button onClick={this.handleAddItem}>Add item to sell</button>
                </div>
                <div className='mainContainer'>
                    <div className="dropdown">
                        <button className="dropbtn">Categories</button>
                        <div className="dropdown-content">
                            <div onClick={function () {
                                this.setState({ category: 'all' })
                                this.getItems()
                            }.bind(this)}>
                                All items
                            </div>
                            <div onClick={function () {
                                this.setState({ category: 'clothing' })
                                this.getItems()
                            }.bind(this)}>
                                Clothing
                            </div>
                            <div onClick={function () {
                                this.setState({ category: 'home' })
                                this.getItems()
                            }.bind(this)}>
                                Home
                            </div>
                            <div onClick={function () {
                                this.setState({ category: 'electronics' })
                                this.getItems()
                            }.bind(this)}>
                                Electronics
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <form onSubmit={this.handleSearchSubmit}>
                        Search:&nbsp;
                        <input onChange={this.handleSearchChange} value={this.state.searchInput} type='search'/>
                        <input type='submit'/>
                    </form>
                </div>
                <div><button onClick={this.handleShoppingCart}>Shopping Cart</button></div>
                <div>{this.state.itemsDisplayed.map(this.renderItems)}</div>
            </div>
        )
    }
}

let connectedHome = connect(function (store) {
    return {
        sessionID: store.session
    }
})(withRouter(Home))
export default connectedHome