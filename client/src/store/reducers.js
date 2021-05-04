import {combineReducers} from 'redux'
import socketSlice from './slices/socketSlice';
import userSlice from './slices/userSlice';

export default combineReducers({
    socket: socketSlice,
    user: userSlice,
})