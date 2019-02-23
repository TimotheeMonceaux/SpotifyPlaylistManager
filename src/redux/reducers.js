import {combineReducers} from 'redux';
import {ActionType} from './actions';


const clientId = (clientId = "", action) => {
    if (action.type === ActionType.ADD_CLIENT_ID)
        return action.clientId
    return clientId
};

const userToken = (userToken = "", action) => {
    if (action.type === ActionType.ADD_USER_TOKEN)
        return action.userTolken
    return userToken
};

const reducer = combineReducers ({
    clientId, 
    userToken
});

export default reducer;