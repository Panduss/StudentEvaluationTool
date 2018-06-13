import {ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILED} from '../actions/student'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = {}, action ) => {
  switch (action.type) {

    case ADD_STUDENT_SUCCESS:
        return {
            success: true
        }
    
    case ADD_STUDENT_FAILED:
      return {
        error: action.payload
      }

    default:
        return state
  }
}