import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';

export default combineReducers({
  roomsRedux: roomsReducer,
  // room: roomReducer,
});
