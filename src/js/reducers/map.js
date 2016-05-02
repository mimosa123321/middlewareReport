import { GET_AIRPORTS, ADD_ROUTE } from './../constants/ActionTypes';

const initialState = {
    isReady:false,
    airports:[],
    routeSpots:[]
};

export default function map(state = initialState, action) {
    switch(action.type) {
        case GET_AIRPORTS:
            return {
                ...state,
                 airports: action.airports.map( (obj)=> {
                     return Object.assign({}, obj, { isChosen : false})
                }),
                isReady: true
            };

        case ADD_ROUTE:
            return {
                ...state,
                airports: updateAirportsState(state, action.destIndex),
                routeSpots: addRouteSpots(state, action.routeSpot)
            };

        default:
            return state;
    }
}

function updateAirportsState(state, destIndex) {
    return state.airports.map((obj, index) => {
        return index === parseInt(destIndex) ? Object.assign({}, obj, { isChosen : true }) : obj
    });
}

function addRouteSpots(state, routeSpot) {
    return [
        ...state.routeSpots,
        routeSpot
    ]
}
