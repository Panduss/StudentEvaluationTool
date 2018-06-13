import {GET_STUDENT} from '../actions/student'
// import { ADD_EVALUATION } from '../actions/evaluation';

export default (state = [], action ) => {
    switch (action.type) {
        
        case GET_STUDENT:
            return [action.payload]

        default:
            return state
    }
  }

//   state.concat(action.payload)