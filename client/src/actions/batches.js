import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_BATCHES = 'GET_BATCHES'
export const GET_BATCH = 'GET_BATCH'
export const GET_BATCH_ID = 'GET_BATCH_ID'
export const ADD_BATCH= 'ADD_BATCH'

export const showBatch = (batchId) => (dispatch) => {
  
  request
  .get(`${baseUrl}/batches/${batchId}`)
  .then(result => {
    dispatch({
      type: GET_BATCH,
      payload: result.body
    })
  })
  .catch(err => console.log(err))
}  

export const showBatches = () => (dispatch) => {
 
  request
  .get(`${baseUrl}/batches`)
  .then(response => {
      dispatch({
        type: GET_BATCHES,
        payload: response.body
      })
    })
  .catch(err => console.error(err))
}

  export const newBatch = (batchNumber, startDate, endDate) => (dispatch) => {

    request
      .post(`${baseUrl}/batches`)
      .send({ batchNumber, startDate, endDate })
      .then(response => {
        dispatch({
          type: ADD_BATCH,
          payload: response.body
        })
      })
      .catch(err => console.error(err))
  }
