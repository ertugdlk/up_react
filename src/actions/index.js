// import Axios from 'axios';
import axios from '../utils'
import {
  addNewRoom,
  fetchAllRooms,
  getUserGames,
  getMatchDataText,
  removeRoom,
  fetchFreeRooms,
  fetchPaidRooms,
} from '../utils/helpers'
import _ from 'lodash'

export const getAllGameRooms = (rooms = [], isChangeHost = false) => async (
  dispatch
) => {
  if (!isChangeHost) {
    dispatch({ type: 'FETCH_ALL_ROOMS', payload: [...rooms] })
  }

  if (isChangeHost) {
    const response = await axios.get('room/getall', { withCredentials: true })

    dispatch({ type: fetchAllRooms, payload: response.data })
  }
}

export const getFreeGameRooms = (rooms = [], isChangeHost = false) => async (
  dispatch
) => {
  if (isChangeHost) {
    dispatch({ type: fetchFreeRooms, payload: [...rooms] })
  }

  if (!isChangeHost) {
    const response = await axios.get('room/getwaitingfree', {
      withCredentials: true,
    })

    dispatch({ type: fetchFreeRooms, payload: response.data })
  }
}

export const getPaidGameRooms = (rooms = [], isChangeHost = false) => async (
  dispatch
) => {
  if (isChangeHost) {
    dispatch({ type: fetchPaidRooms, payload: [...rooms] })
  }

  if (!isChangeHost) {
    const response = await axios.get('room/getwaitingpaid', {
      withCredentials: true,
    })

    dispatch({ type: fetchPaidRooms, payload: response.data })
  }
}

export const addNewGame = (data) => async (dispatch, getState) => {
  const result = _.find(getState().roomsRedux, function (room) {
    return room.host == data.host
  })

  if (result !== undefined) {
    return
  } else {
    dispatch({ type: addNewRoom, payload: data }) //data.room data.type
  }
}

export const removeGameRoom = (host) => async (dispatch, getState) => {
  const result = _.find(getState().roomsRedux, function (room) {
    return room.host == host
  })

  if (result === undefined) {
    return
  } else {
    dispatch({ type: removeRoom, payload: host })
  }
}

export const getAllUserGames = () => async (dispatch) => {
  const url = 'detail/games'
  const response = await axios.get(url, { withCredentials: true })
  dispatch({ type: getUserGames, payload: response.data })
}

export const getMatchData = (host, isPositive) => async (
  dispatch,
  getState
) => {
  const roomsFree = getState().freeGames
  const roomsPaid = getState().paidGames
  let realIndex = ''
  let rooms = []

  const index = _.findIndex(getState().roomsRedux, function (room) {
    return room.host == host
  })

  const indexFree = _.findIndex(getState().freeGames, function (room) {
    return room.host == host
  })
  const indexPaid = _.findIndex(getState().paidGames, function (room) {
    return room.host == host
  })

  if (indexFree > -1) {
    realIndex = indexFree
    rooms = roomsFree
  }
  if (indexPaid > -1) {
    realIndex = indexPaid
    rooms = roomsPaid
  }

  console.log('indexFree', indexFree)
  console.log('indexPaid', indexPaid)

  console.log('findIndex', index)

  switch (isPositive) {
    case true:
      rooms[realIndex].userCount += 1
      break
    case false:
      rooms[realIndex].userCount -= 1
      break
  }

  if (indexFree > -1) {
    dispatch(getFreeGameRooms(rooms, true))
  }
  if (indexPaid > -1) {
    dispatch(getPaidGameRooms(rooms, true))
  }
}

export const changeGameHost = (host, newHost) => async (dispatch, getState) => {
  const rooms = getState().roomsRedux
  const index = _.findIndex(rooms, function (room) {
    return room.host == host
  })

  rooms[index].host = newHost

  dispatch(getAllGameRooms(rooms, true))
}
