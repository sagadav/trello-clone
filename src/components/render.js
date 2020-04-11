import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import store from '../store/store'
import {Provider} from 'react-redux'

export  default function render() {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}
