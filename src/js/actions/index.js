import * as actionTypes from './../constants/ActionTypes';
import api from './../api/index';

function getAirports(airports) {
    return {
        type: actionTypes.GET_AIRPORTS,
        airports: airports
    };
}

export function getAllAirports(url) {
    return (dispatch) => {
        api.getAirports(url, (response) => {
            dispatch(getAirports(response));
        });
    };
}

export function addRoute(routeSpot, destIndex) {
    return {
        type: actionTypes.ADD_ROUTE,
        routeSpot: routeSpot,
        destIndex: destIndex
    };
}

export function getSystemAnalytics(data) {
    return {
        type: actionTypes.GET_SYSTEM_ANALYTICS,
        data: data
    };
}


export function getAllData(url) {
    return (dispatch) => {
        api.getSystemAnalytics(url).then((response) => {
            dispatch(getSystemAnalytics(JSON.parse(response)));
        });
    };
}


export function changeSystemOption(listId, optionId) {
    return {
        type: actionTypes.CHANGE_SYSTEM_OPTION,
        listId: listId,
        optionId: optionId
    };
}



