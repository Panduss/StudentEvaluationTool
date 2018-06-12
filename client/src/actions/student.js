import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'


export const GET_STUDENT = 'GET_BATCH'

export const showStudent = (id) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/students/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => 
        dispatch({
            type: GET_STUDENT,
            payload: result.body
        })
    )
      .catch(err => console.error(err))
  }