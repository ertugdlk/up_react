import { getMatchDataText } from '../utils/helpers';

export default (state = {}, action) => {
  switch (action.type) {
    case getMatchDataText:
      return action.payload;
    default:
      return state;
  }
};
