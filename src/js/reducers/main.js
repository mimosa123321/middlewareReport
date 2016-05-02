import * as actionTypes from './../constants/ActionTypes';

const initialState = {
    overviewLists:[{
    	"id": "Hardware",
    	"type": 10,
    	"t_no": 200,
    	"f_sp": 160,
    	"p_sp": 2,
    	"n_sp": 20,
    	"n": 20
    }, {
    	"id": "OS",
    	"type": 10,
    	"t_no": 10,
    	"f_sp": 8,
    	"p_sp": 3,
    	"n_sp": 2,
    	"n": 2
    }, {
    	"id": "Middleware",
    	"type": 200,
    	"t_no": 200,
    	"f_sp": 160,
    	"p_sp": 2,
    	"n_sp": 20,
    	"n": 20
    }, {
    	"id": "System",
    	"type": "",
    	"t_no": 100,
    	"f_sp": "",
    	"p_sp": "",
    	"n_sp": "",
    	"n": ""
    }],
    
    systemNavLists:[{
    	"name":"Scope",
    	"options": [{
    		"name":"ALL",
    		"isChosen":true
    	},{
    		"name":"Production",
    		"isChosen":false
    	},{
    		"name":"Project",
    		"isChosen":false 
    	}]
    },{
    	"name":"Supportability",
    	"options": [{
    		"name":"ALL",
    		"isChosen":true
    	},{
    		"name":"Full Support",
    		"isChosen":false
    	},{
    		"name":"Partial Support",
    		"isChosen":false
    	},{
    		"name":"Non Support",
    		"isChosen":false 
    	},{
    		"name":"Non Data",
    		"isChosen":false 
    	}]
    },{
    	"name":"Compatibility",
    	"options": [{
    		"name":"ALL",
    		"isChosen":true
    	},{
    		"name":"Compatible",
    		"isChosen":false
    	},{
    		"name":"Incompatible",
    		"isChosen":false
    	},{
    		"name":"Non Data",
    		"isChosen":false 
    	}]
    }],

	systemAnalytics:[]
};

export default function main(state = initialState, action) {
    switch(action.type) {
        case actionTypes.GET_SYSTEM_ANALYTICS:
			return {
				...state,
				systemAnalytics: action.data.map((dataObj)=> {
					return dataObj;
				})
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
				})
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


