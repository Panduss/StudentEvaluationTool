import {ADD_BATCH_SUCCESS, ADD_BATCH_FAILED} from '../actions/batches'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = {}, {type, payload} ) => {
  switch (type) {

    case ADD_BATCH_SUCCESS:
        return {
            success: true
        }
    
    case ADD_BATCH_FAILED:
      return {
        error: payload
      }

    default:
        return state
  }
}