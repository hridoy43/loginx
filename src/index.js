import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import allReducers from './reducers'
import { Provider } from 'react-redux'


const saveToLocal = (state) => {
    try {
        const data = JSON.stringify(state);
        localStorage.setItem('state', data)
    } catch (e) {
        console.log(e)
    }
}

const loadFromLocal = () => {
    try {
        const data = localStorage.getItem('state');
        if (data === null) return undefined;
        return JSON.parse(data)
    } catch (e) {
        console.log(e)
        return undefined;
    }
}

const localData = loadFromLocal();


const store = createStore(
    allReducers,
    localData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


store.subscribe(() => {
    console.log(store.getState())
    saveToLocal(store.getState())
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
