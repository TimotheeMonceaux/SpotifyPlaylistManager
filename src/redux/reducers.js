import {combineReducers} from 'redux';

const text = (text = "BONJOUR", action) => {return action.type};

const reducer = combineReducers ({text});

export default reducer;