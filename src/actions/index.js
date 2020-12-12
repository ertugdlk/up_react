import Axios from 'axios';

export const getAllGameRooms = () => async (dispatch) => {
  const response = await Axios.get('http://localhost:5000/room/getall', {
    withCredentials: true,
  });
  // console.log(response.data);
  dispatch({ type: 'FETCH_ALL_ROOMS', payload: response.data });
};

export const addNewGame = (data) => async (dispatch, getState) => {
  // iki tür olsun ya mevcuttakilerden ayıklayıp getirsin veya gidip tek çeksin
  // const allRooms = [...getState().roomsRedux, data];
  console.log('====================================');
  console.log('Action:', data);
  console.log('====================================');

  dispatch({ type: 'ADD_NEW_ROOM', payload: data });
};
