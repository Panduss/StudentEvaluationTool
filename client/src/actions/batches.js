import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_BATCHES = 'GET_BATCHES'
export const ADD_BATCH = 'ADD_BATCH'
export const GET_BATCH = 'GET_BATCH'

export const showBatch = (id) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/batches/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => 
        dispatch({
            type: GET_BATCH,
            payload: result.body.students
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


// export const UPDATE_BATCHES = 'UPDATE_BATCHES'
// export const UPDATE_BATCH_SUCCESS = 'UPDATE_BATCH_SUCCESS'

// const addBatch = batch => ({
//   type: ADD_BATCH,
//   payload: batch
// })


// const updateBatchSuccess = () => ({
//   type: UPDATE_BATCH_SUCCESS
// })





// export const createBatch = () => (dispatch, getState) => {
//   const state = getState()
//   const jwt = state.currentUser.jwt

//   if (isExpired(jwt)) return dispatch(logout())

//   request
//     .post(`${baseUrl}/batches`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .send(batch)
//     .then(result => dispatch(addBatch(batch)))
//     .catch(err => console.error(err))
// }

// export const updateBatch = (batchId, board) => (dispatch, getState) => {
//   const state = getState()
//   const jwt = state.currentUser.jwt

//   if (isExpired(jwt)) return dispatch(logout())

//   request
//     .patch(`${baseUrl}/batches/${batchId}`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .send({ board })
//     .then(_ => dispatch(updateBatchSuccess()))
//     .catch(err => console.error(err))
// }