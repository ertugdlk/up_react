import { getUserGames, addNewRoom } from '../utils/helpers'

export default (state = [], action) => {
  switch (action.type) {
    case getUserGames:
      return action.payload
    case addNewRoom:
      return [...state, action.payload]
    default:
      return state
  }
}
