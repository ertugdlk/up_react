import { combineReducers } from 'redux'
import roomsReducer from './roomsReducer'
import userGamesReducer from './userGamesReducer'
import matchReducer from './matchReducer'
import freeGameReducer from './freeGameReducer'
import paidGameReducer from './paidGameReducer'

export default combineReducers({
  roomsRedux: roomsReducer,
  userGames: userGamesReducer,
  freeGames: freeGameReducer,
  paidGames: paidGameReducer,
  //matchInfo: matchReducer,
})
