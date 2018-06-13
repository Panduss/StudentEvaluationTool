import {ADD_BATCH_SUCCESS, ADD_BATCH_FAILED} from '../actions/batches'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = {}, action ) => {
  switch (action.type) {

    case ADD_BATCH_SUCCESS:
        return {
            success: true
        }
    
    case ADD_BATCH_FAILED:
      return {
        error: action.payload
      }

    default:
        return state
  }
}