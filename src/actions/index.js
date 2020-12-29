// import Axios from 'axios';
import axios from '../utils';
import {
  addNewRoom,
  fetchAllRooms,
  getUserGames,
  getMatchDataText,
  removeRoom,
} from '../utils/helpers';
import _ from 'lodash';

export const getAllGameRooms = (rooms = [], isChangeHost = false) => async (
  dispatch
) => {
  if (isChangeHost) {
    dispatch({ type: fetchAllRooms, payload: [...rooms] });
  }

  if (!isChangeHost) {
    const response = await axios.get('room/getall', { withCredentials: true });
    dispatch({ type: fetchAllRooms, payload: response.data });
  }
};

export const addNewGame = (data) => async (dispatch, getState) => {
  dispatch({ type: addNewRoom, payload: data });
};
export const removeGameRoom = (host) => async (dispatch, getState) => {

  dispatch({ type: removeRoom, payload: host });
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
  const rooms = getState().roomsRedux

  const index = _.findIndex(getState().roomsRedux, function (room) {
    return room.host == host;
  });

  switch (isPositive) {
    case true:
      rooms[index].userCount += 1;
      break;
    case false:
      rooms[index].userCount -= 1;
      break;
  }

  dispatch(getAllGameRooms(rooms, true));
};

export const changeGameHost = (host, newHost) => async (dispatch, getState) => {
  const rooms = getState().roomsRedux
  const index = _.findIndex(getState().roomsRedux, function (room) {
    return room.host == host;
  });

  rooms[index].host = newHost;

  dispatch(getAllGameRooms(rooms, true));
};
