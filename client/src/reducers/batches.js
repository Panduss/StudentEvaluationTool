import {GET_BATCHES} from '../actions/batches'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, action ) => {
  switch (action.type) {

    case GET_BATCHES:
        return action.payload

    default:
        return state
  }
}