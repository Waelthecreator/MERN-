import {legacy_createStore as createStore } from 'redux';
import reducer from './reducer';

const initialState = {
    authenticated: false,
    isEditing: false
};
const store = createStore(reducer,initialState);
export default store;