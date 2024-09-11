// store.js
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../src/reducers/index'; 

const store = createStore(rootReducer); // Crie o store com o rootReducer

export default store;