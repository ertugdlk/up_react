// import Axios from 'axios';
import axios from '../utils';
import {
  addNewRoom,
  fetchAllRooms,
  getUserGames,
  getMatchDataText,
} from '../utils/helpers';
import _ from 'lodash';

export const getAllGameRooms = (rooms = [], isChangeHost = false) => async (
  dispatch
) => {
  if (isChangeHost) {
    console.log('Action Rooms', rooms);
    dispatch({ type: fetchAllRooms, payload: [...rooms] });
  }

  if (!isChangeHost) {
    const response = await axios.get('room/getall', { withCredentials: true });
    // console.log(response.data);
    dispatch({ type: fetchAllRooms, payload: response.data });
  }
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

export const getMatchData = (host, isPositive) => async (
  dispatch,
  getState
) => {
  const rooms = [...getState().roomsRedux];
  console.log('Rooms:', rooms);

  const index = _.findIndex(getState().roomsRedux, function (room) {
    return room.host == host;
  });
  console.log('Rooms Array', rooms[index]);
  // getState().roomsRedux[index].usersCount += 1;

  switch (isPositive) {
    case true:
      rooms[index].userCount += 1;
      break;
    case false:
      rooms[index].userCount -= 1;
      break;
  }
  // host ile nickname yerni değiştir

  dispatch(getAllGameRooms(rooms, true));

  // dispatch({ type: getMatchDataText, payload: singleRoom });
};
