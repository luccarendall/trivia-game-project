import { combineReducers } from 'redux';
import playerReducer from '.';

const rootReducer = combineReducers({ playerReducer });

export default rootReducer;
