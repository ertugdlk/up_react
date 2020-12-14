import { fetchAllRooms, addNewRoom } from '../utils/helpers';

export default (state = [], action) => {
  switch (action.type) {
    case fetchAllRooms:
      return action.payload;
    case addNewRoom:
      return [...state, action.payload];
    default:
      return state;
  }
};
