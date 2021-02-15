import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import userGamesReducer from './userGamesReducer';
import matchReducer from './matchReducer';

export default combineReducers({
  roomsRedux: roomsReducer,
  userGames: userGamesReducer,
  //matchInfo: matchReducer,
});
