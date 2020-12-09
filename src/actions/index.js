import Axios from 'axios';

export const getAllGameRooms = () => async (dispatch) => {
  const respons = await Axios.get('http://localhost:5000/room/getall');
  console.log(respons);

  dispatch({ type: 'FETCH_ALL_ROOMS', payload: respons.data });
};
