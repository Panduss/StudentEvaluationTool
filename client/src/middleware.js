import {USER_LOGIN_SUCCESS, USER_LOGOUT} from './actions/users'
import {localStorageJwtKey} from './constants'
import jwtDecode from 'jwt-decode'

export const storeJwt = store => next => action => {
  try {
    if (action.type === USER_LOGIN_SUCCESS) {
      localStorage.setItem(localStorageJwtKey, action.payload.jwt)
    }
    if (action.type === USER_LOGOUT) {
      localStorage.removeItem(localStorageJwtKey)
    }
  }
  catch (e) {
    console.log(`Interaction with LocalStorage went wrong`, e)
  }
  next(action)
}

export const checkStoreJwtExpiration = store => next => action => {
  const token = localStorage.getItem(localStorageJwtKey) ? localStorage.getItem(localStorageJwtKey).jwt : undefined
  if (!token || jwtDecode(token).exp < Date.now() / 1000) {
    localStorage.clear()
    next(action)
  }
  next(action)
}
