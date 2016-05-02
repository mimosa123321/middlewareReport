import { combineReducers } from 'redux';
import { default as main } from './main';
import { default as map } from './map';

const rootReducer = combineReducers({
	main
});

export default rootReducer;


