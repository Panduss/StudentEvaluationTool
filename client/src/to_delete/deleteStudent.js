import {DELETE_STUDENT} from '../actions/student'


export default (state = {}, action ) => {
    switch (action.type) {

        case DELETE_STUDENT:
        return
            return action.payload

        default:
            return state
    }
}