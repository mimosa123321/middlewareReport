import React from 'react';
//import configureStore from './src/js/store/configureStore';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/js/reducers/index';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { getAllAirports, getAllData } from './src/js/actions/index';
import * as actionTypes from './src/js/constants/ActionTypes';
import App from './src/js/container/App';

var airportsURL = './src/js/api/airports.json';
//var defaultSystemDataURL = 'http://pc15290:8888/compatibility/scope/all/supportability/all/compatibility/all/';
//var mainOverviewDataURL = 'http://pc15290:8888/';
var defaultSystemDataURL = './src/js/api/all.json';
var mainOverviewDataURL = './src/js/api/data.json';

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

store.dispatch(getAllData(defaultSystemDataURL, actionTypes.GET_SYSTEM_ANALYTICS));
store.dispatch(getAllData(mainOverviewDataURL, actionTypes.GET_MAIN_ANALYTICS));

