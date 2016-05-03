require("./src/css/style.scss");

import React from 'react';
//import configureStore from './src/js/store/configureStore';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/js/reducers/index';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { getAllAirports, getAllData } from './src/js/actions/index'
import App from './src/js/container/App';

var airportsURL = './src/js/api/airports.json';
var dataURL = './src/js/api/data.json';
var dataURL2 = './src/js/api/data.json';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

//store.dispatch(getAllAirports(airportsURL));
store.dispatch(getAllData(dataURL));


