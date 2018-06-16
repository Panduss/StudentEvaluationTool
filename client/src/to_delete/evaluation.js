import {GET_EVALUATION} from '../actions/evaluation'

export default (state = [], action ) => {
    switch (action.type) {
        
        case GET_EVALUATION:
            return action.payload

        default:
            return state
    }
  }