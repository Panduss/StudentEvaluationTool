import { GET_BATCH, GET_BATCHES, ADD_BATCH, DELETE_BATCH } from '../actions/batches'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = [], action ) => {
  switch (action.type) {

    case GET_BATCH:
    return [action.payload]

    case GET_BATCHES:
        return action.payload

    case ADD_BATCH:
          return [...state, action.payload]
    
    case DELETE_BATCH: 
          return state.filter(batch => batch.id !== action.payload)

    default:
        return state
  }
}