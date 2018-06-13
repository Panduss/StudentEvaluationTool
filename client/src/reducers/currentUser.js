import {USER_LOGIN_SUCCESS, USER_LOGOUT} from '../actions/users'
// import {localStorageJwtKey} from '../constants'

let initialState = null
// try {
//   const jwt = localStorage.getItem(localStorageJwtKey)
//   if (jwt) {
//     initialState = { jwt }
//   }
// }
// catch (e) {
//   console.log(`Error retrieving data from local storage`, e)
// }

export default function (state = initialState, action ) {
	switch (action.type) {
		case USER_LOGIN_SUCCESS:
      return action.payload

    case USER_LOGOUT:
      return null

		default:
      return state
	}
}