// import Axios from 'axios';
import axios from '../utils';
import {
  addNewRoom,
  fetchAllRooms,
  getUserGames,
  getMatchDataText,
} from '../utils/helpers';

export const getAllGameRooms = () => async (dispatch) => {
  const response = await axios.get('room/getall', { withCredentials: true });
  // console.log(response.data);
  dispatch({ type: fetchAllRooms, payload: response.data });
};

export const addNewGame = (data) => async (dispatch, getState) => {
  // iki tür olsun ya mevcuttakilerden ayıklayıp getirsin veya gidip tek çeksin
  // const allRooms = [...getState().roomsRedux, data];

  dispatch({ type: addNewRoom, payload: data });
};

export const getAllUserGames = () => async (dispatch) => {
  const url = 'detail/games';
  const response = await axios.get(url, { withCredentials: true });
  dispatch({ type: getUserGames, payload: response.data });
};

export const getMatchData = (user) => async (dispatch, getState) => {
  const rooms = getState().roomsRedux;
  const gameObject = rooms.filter((item) => item.name === user);
  console.log(user);
  dispatch({ type: getMatchDataText, payload: gameObject });
};
