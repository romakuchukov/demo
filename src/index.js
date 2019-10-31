import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers';
import { AppProvider } from './context/AppContext';


import App from './App';

import * as serviceWorker from './serviceWorker';

let store = createStore(
    allReducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><AppProvider><App/></AppProvider></Provider>, document.getElementById('root'));

if(module.hot) { module.hot.accept() }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
