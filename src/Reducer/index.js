import { combineReducers } from 'redux';
import user from './userReducer';

const appReducer = combineReducers({
    user
})

const rootReducer = ( state, action ) => {
    return appReducer(state, action)
}

export default rootReducer;