import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_BATCHES = 'GET_BATCHES'
export const GET_BATCH = 'GET_BATCH'
export const GET_BATCH_ID = 'GET_BATCH_ID'
export const ADD_BATCH= 'ADD_BATCH'


export const showBatch = (batchId) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
    
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/batches/${batchId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => 
        dispatch({
            type: GET_BATCH,
            payload: result.body
        })
    )
      .catch(err => console.error(err))
  }

export const showBatches = () => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/batches`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => 
          dispatch({
              type: GET_BATCHES,
              payload: result.body
            })
      )
      .catch(err => alert(err))
  }

  export const newBatch = (batchNumber, startDate, endDate) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    if (isExpired(jwt)) return dispatch(logout())

    request
      .post(`${baseUrl}/batches`)
      .send({ batchNumber, startDate, endDate })
      .then(result => {
        dispatch({
          type: ADD_BATCH,
          payload: result.body
        })
      })
    
    // request
    //   .get(`${baseUrl}/batches`)
    //   .set('Authorization', `Bearer ${jwt}`)
    //   .then(result => 
    //     dispatch({
    //         type: GET_BATCHES,
    //         payload: state.batches
    //     })
    // )
      .catch(err => console.error(err))
  }
