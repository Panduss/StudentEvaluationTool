import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_EVALUATION = "GET_EVALUATION"
export const GET_STUDENT = 'GET_STUDENT'
export const GET_ALL_STUDENT = "GET_ALL_STUDENT"
export const ADD_STUDENT = "ADD_STUDENT"

export const DELETE_STUDENT = "DELETE_STUDENT"


export const showStudent = (studentId) => (dispatch) => {
  
    request
    .get(`${baseUrl}/students/${studentId}`)
    .then(response => {
        dispatch({
            type: GET_STUDENT,
            payload: response.body
        })
    })

    request
    .get(`${baseUrl}/students/${studentId}/evaluations`)
    .then(response => 
        dispatch({
            type: GET_EVALUATION,
            payload: response.body
        })
      )
  .catch(err => console.error(err))
}

  export const newStudent = ( firstName, lastName, profilePic, lastEvaluation, batchId ) => (dispatch) => {
  
    request
      .post(`${baseUrl}/batches/${batchId}/students`)
      .send({ firstName, lastName, profilePic, lastEvaluation: "white", batch: batchId})
      .then(response => {
        dispatch({
          type: ADD_STUDENT,
          payload: response.body
        })
    })
      .catch(err => console.error(err))
    }

  export const getAllStudent = (batchId) => (dispatch) => {

    request
      .get(`${baseUrl}/batches/${batchId}/students`)
      .then(response => {
        dispatch({
          type: GET_ALL_STUDENT,
          payload: response.body
    })
  })
  // request
  //   .get(`${baseUrl}/students/${studentId}/evaluations`)
  //   .set('Authorization', `Bearer ${jwt}`)
  //   .then(result => 
  //       dispatch({
  //           type: GET_EVALUATION,
  //           payload: result.body
  //       })
  //     )
  .catch(err => console.error(err))
}

  export const deleteStudent = (studentId) => (dispatch) => {
    
    request
    .delete(`${baseUrl}/students/${studentId}`)
    .then(response => dispatch({
      type: DELETE_STUDENT,
      payload: studentId
    }))
  }