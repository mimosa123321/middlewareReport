import * as actionTypes from './../constants/ActionTypes';

const initialState = {
    overviewLists:[],
    /*systemNavLists:[{
    	"name":"Scope",
    	"options": [{
    		"name":"ALL",
    		"id":"all",
    		"isChosen":true
    	},{
    		"name":"Production",
    		"id":"production",
    		"isChosen":false
    	},{
    		"name":"Project",
    		"id":"project",
    		"isChosen":false 
    	}]
    },{
    	"name":"Supportability",
    	"options": [{
    		"name":"ALL",
    		"id":"all",
    		"isChosen":true
    	},{
    		"name":"Full Support",
    		"id":"full",
    		"isChosen":false
    	},{
    		"name":"Partial Support",
    		"id":"partial",
    		"isChosen":false
    	},{
    		"name":"Non Support",
    		"id":"nonsupport",
    		"isChosen":false 
    	},{
    		"name":"No Data",
    		"id":"nodata",
    		"isChosen":false 
    	}]
    },{
    	"name":"Compatibility",
    	"options": [{
    		"name":"ALL",
    		"id":"all",
    		"isChosen":true
    	},{
    		"name":"Compatible",
    		"id":"compatible",
    		"isChosen":false
    	},{
    		"name":"Incompatible",
    		"id":"incompatible",
    		"isChosen":false
    	},{
    		"name":"No Data",
    		"id":"nodata",
    		"isChosen":false 
    	}]
    }]*/
    
    systemNavLists:[{
    	"name":"Supportability",
    	"options": [{
    		"name":"All",
    		"id":"all",
    		"isChosen":true
    	},{
    		"name":"Full Support",
    		"id":"full",
    		"isChosen":false
    	},{
    		"name":"Partial Support",
    		"id":"partial",
    		"isChosen":false
    	},{
    		"name":"Non Support",
    		"id":"nonsupport",
    		"isChosen":false 
    	},{
    		"name":"No Data",
    		"id":"nodata",
    		"isChosen":false 
    	}]
    },{
    	"name":"Compatibility",
    	"options": [{
    		"name":"All",
    		"id":"all",
    		"isChosen":true
    	},{
    		"name":"Compatible",
    		"id":"compatible",
    		"isChosen":false
    	},{
    		"name":"Incompatible",
    		"id":"incompatible",
    		"isChosen":false
    	},{
    		"name":"No Data",
    		"id":"nodata",
    		"isChosen":false 
    	}]
    }],
    
	systemAnalytics:[],
	systemAnalyticsHeader:["OS All","Middleware All","Middlewares All"],
	additionAnalytics:[],
	isAdditionOverviewOpen: false,
	isLoading: true,
	isAdditionAnalyticsLoading: true,
};
export default function main(state = initialState, action) {
	console.log(state.isLoading);
    switch(action.type) {
    	case actionTypes.GET_MAIN_ANALYTICS:
    		console.log(action.data);
    		return {
			...state,
			overviewLists: action.data.map((dataObj)=> {
				return dataObj;
				})
			}
    		
        case actionTypes.GET_SYSTEM_ANALYTICS:
			return {
				...state,
				systemAnalytics: action.data.map((dataObj)=> {
					return dataObj;
				}),
				isLoading: false
			}

		case actionTypes.CHANGE_SYSTEM_OPTION:
			return {
				...state,
				systemNavLists:  state.systemNavLists.map((navObj, index)=>{
					if(index === action.listId) {
						return {
							...navObj,
							options: updateNavOptions(navObj.options, action.optionId)
						}
					}
					return navObj
				}),
				
				systemAnalyticsHeader: state.systemAnalyticsHeader.map((headerObj, index) => {
					var supportabilityOptions = state.systemNavLists[0].options[action.activeBtnArr[0]].name;
					var campatibilityOptions = state.systemNavLists[1].options[action.activeBtnArr[1]].name;
					if(index == 0) {
						return 'OS ' +  supportabilityOptions;
					}else if(index == 1) {
						return 'Middleware ' +  supportabilityOptions;
					}else if(index == 2) {
						return 'Middlewares ' +  campatibilityOptions;
					}
				}),
				isLoading: true
			}
			
		case actionTypes.GET_ADDITION_ANALYTICS:
			return {
				...state,
				additionAnalytics: action.data.map((resultObj, index)=> {
					return resultObj;
				}),
				isAdditionAnalyticsLoading: false
			}
			
		case actionTypes.OPEN_ADDITION_ANALYTICS_LAYER:
			console.log("openAdditionAnalytics - here");
			return {
				...state,
				isAdditionOverviewOpen: true,
				isAdditionAnalyticsLoading: true
			}

        default:
            return state;
    }
}

function updateNavOptions(optObj, updateOptionId) {
	var option = optObj.map((optionObj, id) => {
		if(id === updateOptionId) {
			return {
				...optionObj,
				isChosen: true
			}
		}else {
			return {
				...optionObj,
				isChosen: false
			}
		}
	})
	return option
}


