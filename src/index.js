import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'

//Reducer:
let reducer = function( state, action){

    return state
}
//CreateStore:
const store = createStore(
    reducer, // reducer
    {}, // initial state
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

let contents = (<Provider store={store}>
    <App />
</Provider>)

ReactDOM.render(contents, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
