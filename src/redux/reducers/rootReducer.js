import { combineReducers } from 'redux';
import loginReducer from '.';
import scoreReducer from './score';

const rootReducer = combineReducers({ loginReducer, scoreReducer });

export default rootReducer;
