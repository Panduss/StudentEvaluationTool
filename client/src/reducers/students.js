import {GET_STUDENT, GET_ALL_STUDENT, ADD_STUDENT, DELETE_STUDENT} from '../actions/student'
// import { ADD_EVALUATION } from '../actions/evaluation';

export default (state = [], action ) => {
    switch (action.type) {

        case GET_STUDENT:
            return [action.payload]
        
        case GET_ALL_STUDENT:
            return action.payload

        case ADD_STUDENT:
            return [...state, action.payload]

        case DELETE_STUDENT: 
            return state.filter(student => student.id !== action.payload.id)

        default:
            return state
    }
  }

//   state.concat(action.payload)