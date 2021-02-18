import { fetchFreeRooms } from '../utils/helpers'
const _ = require('lodash')

export default (state = [], action) => {
  switch (action.type) {
    case fetchFreeRooms:
      return action.payload
    default:
      return state
  }
}
