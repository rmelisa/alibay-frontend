import React, {Component} from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './home.css';


class Home extends Component {
    constructor() {
        super()
        this.state = {
            category: 'all', //need to agree on categories
            items: [
                {
                    name: 'painting',
                    image: 'fake.jpg',
                    price: '10$',
                    description: 'Nice paiting',
                    category: 'home',
                    itemID: 1
                }
            ],
            itemsDisplayed: []
        }
        this.getItems = this.getItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }

    componentDidMount(){
        this.getItems()
    }


    getItems() {
        // fetch("/getAllItems") //confirm name
        // .then(response => response.text())
        // .then(response => {
        //   let parsedResponse = JSON.parse(response);
        //   this.setState({ items: parsedResponse.items });//need to return array of items from server
        // })
        // .catch(err => console.log(err));

        if (this.state.category === 'all') {
            this.setState({itemsDisplayed: this.state.items})
            return
        }
        let itemsArr = this.state.items.filter(function (item){
            return item.category === this.state.category
        }.bind(this))
        this.setState({itemsDisplayed: itemsArr})

    }

    renderItems(item) {
        //check that the variable names match what gets returned from the fetch, example image, itemID, price, description
        return (<div className='items'>
                <img src={item.image}></img>
                <div>
               <div>Product name: <Link to= {"/details/" + item.itemID}>{item.name}</Link> </div> 
                    <div>Price: {item.price}</div>
                    <div>Description: {item.description}</div>
                </div>
            </div> )
    }

    handleAddItem() {
        return (<Link to= {"/addItem/"}></Link>)     
    }

    render(){

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
                        <div class="dropdown-content">
                        <div onClick={function () {
                                this.setState({category: 'all'})
                                this.getItems()
                            }.bind(this)}>
                            All items
                            </div>
                            <div onClick={function () {
                                this.setState({category: 'clothing'})
                                this.getItems()
                            }.bind(this)}>
                            Clothing
                            </div>
                            <div onClick={function () {
                                this.setState({category: 'home'})
                                this.getItems()
                            }.bind(this)}>
                            Home
                            </div>
                            <div onClick={function () {
                                this.setState({category: 'electronics'})
                                this.getItems()
                            }.bind(this)}>
                            Electronics
                            </div>
                        </div>
                    </div>
                    <div>{this.state.itemsDisplayed.map(this.renderItems)}</div>
                </div>
               
            </div>
        )
    }
}

let connectedHome = connect()(Home)
export default connectedHome