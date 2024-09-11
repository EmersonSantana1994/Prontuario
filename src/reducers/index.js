// reducers/index.js
import { combineReducers } from 'redux';
import {reduxH} from '../actions/reducers';


const rootReducer = combineReducers({
    'reduxH': reduxH,
  // Outros reducers aqui, se houver
});

export default rootReducer;