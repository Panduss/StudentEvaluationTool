import {GET_BATCHES, ADD_BATCH} from '../actions/batches'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = [], action ) => {
  switch (action.type) {

    case GET_BATCHES:
        return action.payload

    case ADD_BATCH:
          return [...state, action.payload]

    default:
        return state
  }
}