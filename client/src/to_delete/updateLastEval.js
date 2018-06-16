import { LAST_EVAL_UPD } from '../actions/evaluation';

export default (state = {}, action ) => {
    switch (action.type) {
  
        case LAST_EVAL_UPD:
            return action.payload
  
      default:
          return state
    }
  }

