import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import userGamesReducer from './userGamesReducer';

export default combineReducers({
  roomsRedux: roomsReducer,
  userGames: userGamesReducer,
});
