export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_ROOMS':
      console.log('====================================');
      console.log('Reducer', action.payload);
      console.log('====================================');
      return action.payload;
    case 'ADD_NEW_ROOM':
      console.log('====================================');
      console.log('Reducer', action.payload);
      console.log('====================================');
      return [...state, action.payload];
    default:
      return state;
  }
};
