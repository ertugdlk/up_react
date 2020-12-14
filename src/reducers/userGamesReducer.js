import { getUserGames } from '../utils/helpers';

export default (state = [], action) => {
  switch (action.type) {
    case getUserGames:
      return action.payload;
    default:
      return state;
  }
};
