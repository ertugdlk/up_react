import { getUserGames, removeRoom, addNewRoom } from '../utils/helpers';

export default (state = [], action) => {
  switch (action.type) {
    case getUserGames:
      return action.payload;
    case addNewRoom:
      return [...state, action.payload];
    case removeRoom:
      return [...state.filter((room) => room !== action.payload)];
    default:
      return state;
  }
};
