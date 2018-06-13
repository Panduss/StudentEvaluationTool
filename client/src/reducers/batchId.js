import {GET_BATCH_ID} from '../actions/batches'

export default (state = [], action ) => {
    switch (action.type) {
        
        case GET_BATCH_ID:
            return action.payload

        default:
            return state
    }
  }