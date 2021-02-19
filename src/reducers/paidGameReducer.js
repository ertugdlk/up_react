import { fetchPaidRooms } from '../utils/helpers'
const _ = require('lodash')

export default (state = [], action) => {
  switch (action.type) {
    case fetchPaidRooms:
      return action.payload
    default:
      return state
  }
}
