import { fetchAllRooms, addNewRoom, removeRoom } from '../utils/helpers';
const _ = require('lodash')

export default (state = [], action) => {
  switch (action.type) {
    case fetchAllRooms:
      return action.payload;
    case addNewRoom:
      return [...state, action.payload];
    case removeRoom:
      var arr = state
      _.remove(arr , (room) => {
        return room.host === action.payload
      })
      return [...arr];
    default:
      return state;
  }
};
