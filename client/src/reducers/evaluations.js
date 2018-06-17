import { GET_EVALUATION, ADD_EVALUATION } from '../actions/evaluation';

export default (state = [], action ) => {
  switch (action.type) {

    case GET_EVALUATION:
      return action.payload

    case ADD_EVALUATION:
        return [...state, action.payload]

    // case LAST_EVAL_UPD:
    //     return action.payload

    default:
        return state
  }
}