export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_ROOMS':
      return action.payload;
    default:
      return state;
  }
};
