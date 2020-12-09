import Axios from 'axios';

export const getAllGameRooms = () => async (dispatch) => {
  const response = await Axios.get('http://localhost:5000/room/getall' , { withCredentials: true });
  console.log(response);

  dispatch({ type: 'FETCH_ALL_ROOMS', payload: response.data });
};
