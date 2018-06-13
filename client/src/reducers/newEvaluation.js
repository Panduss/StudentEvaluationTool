import { ADD_EVALUATION, LAST_EVAL_UPD } from '../actions/evaluation';

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = {}, action ) => {
  switch (action.type) {

    case ADD_EVALUATION:
        return action.payload

    default:
        return state
  }
}