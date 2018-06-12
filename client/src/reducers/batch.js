import {GET_BATCH} from '../actions/batches'

export default (state = [], action ) => {
    switch (action.type) {
        
        case GET_BATCH:
            return action.payload

        default:
            return state
    }
  }