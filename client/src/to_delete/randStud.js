import {GET_ALL_STUDENT} from '../actions/student'

export default (state=[], action) => {
    switch (action.type) {

        case GET_ALL_STUDENT:
        return action.payload

        default:
            return state
    }
}


// return action.payload.reduce((students, student) => {
//     students[student.id] = student
//     return students
//   }, {})