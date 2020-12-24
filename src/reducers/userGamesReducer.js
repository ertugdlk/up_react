import { getUserGames } from '../utils/helpers';

export default (state = [], action) => {
  switch (action.type) {
    case getUserGames:
      return action.payload;
    case removeRoom:
      return [...state.filter((room) => room !== action.payload)];
    default:
      return state;
  }
};
