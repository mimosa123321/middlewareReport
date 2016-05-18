import * as actionTypes from './../constants/ActionTypes';
import api from './../api/index';

export function getMainAnalytics(data) {
    return {
        type: actionTypes.GET_MAIN_ANALYTICS,
        data: data
    }
}

export function getSystemAnalytics(data) {
    return {
        type: actionTypes.GET_SYSTEM_ANALYTICS,
        data: data
    }
}

export function getAdditionAnalytics(data) {
	return {
        type: actionTypes.GET_ADDITION_ANALYTICS,
        data: data
    }
}

export function getAllData(url, action) {
    return dispatch => {
        api.getData(url).then((response) => {
        	switch (action){
	    		case actionTypes.GET_SYSTEM_ANALYTICS:
	    			dispatch(getSystemAnalytics(JSON.parse(response)));
	    			break;
	    			
	    		case actionTypes.GET_MAIN_ANALYTICS:
	    			dispatch(getMainAnalytics(JSON.parse(response)));
	    			break;
	    			
	    		case actionTypes.GET_ADDITION_ANALYTICS:
	    			dispatch(getAdditionAnalytics(JSON.parse(response)));
	    			break;
	    			
	    		default:
	    			break;
        	}
        })
    };
}

export function openAdditionAnalytics() {
	console.log("openAdditionAnalytics");
	 return {
		 type: actionTypes.OPEN_ADDITION_ANALYTICS_LAYER
	 }
}

export function changeSystemOption(listId, optionId, activeBtnArr) {
    return {
        type: actionTypes.CHANGE_SYSTEM_OPTION,
        listId: listId,
        optionId: optionId,
        activeBtnArr: activeBtnArr
    }
}





