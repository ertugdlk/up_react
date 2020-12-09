import { combineReducers } from 'redux';
import roomReducer from './roomReducer';

export default combineReducers({
  rooms: roomReducer,
});
