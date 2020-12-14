export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_ROOMS':
      return action.payload;
    case 'ADD_NEW_ROOM':
      return [...state, action.payload];
    default:
      return state;
  }
};
