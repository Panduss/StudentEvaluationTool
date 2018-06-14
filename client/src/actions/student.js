import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'
// import {batchId} from '../constants'

export const GET_EVALUATION = "GET_EVALUATION"
export const GET_STUDENT = 'GET_STUDENT'
export const GET_ALL_STUDENT = "GET_ALL_STUDENT"
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS"
export const ADD_STUDENT_FAILED = "ADD_STUDENT_FAILED"

export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS"
export const DELETE_STUDENT_FAILED = "DELETE_STUDENT_FAILED"


const allStudents = students => ({
    type: GET_ALL_STUDENT,
    payload: students
})

export const showStudent = (id) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
     
    const batchId = ((window.location.href).split('/')[4])
    console.log((window.location.href).split('/'))
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/batches/${batchId}/students/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => 
        dispatch({
            type: GET_STUDENT,
            payload: result.body.studentById,
        },
        // {
        //     type: GET_EVALUATION,
        //     payload: result.body.studentById.evalu 
        // }
    ))
      .catch(err => console.error(err))
  }

  export const newStudent = (firstName, lastName, profilePic, lastEvaluation, batch ) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    const batchId = ((window.location.href).split('/')[4])
    console.log((window.location.href).split('/')[4])
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .post(`${baseUrl}/batches/${batchId}/students`)
      .send({ firstName, lastName, profilePic, lastEvaluation, batch: batchId })
      .then(result => {
        dispatch({
          type: ADD_STUDENT_SUCCESS
        })
      })
      .catch(err => {
        if (err.status === 400) {
          dispatch({
            type: ADD_STUDENT_FAILED,
            payload: err.response.body.message || 'Unknown error'
          })
        }
        else {
          console.error(err)
        }
      })
  }

  export const getAllStudent = () => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null

    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())

    request
      .get(`${baseUrl}/students`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => dispatch(allStudents(result.body)))
      .catch(err => console.error(err))
}

    // const state = getState()
    // // const jwt = state.currentUser.jwt

    // // if (isExpired(jwt)) return dispatch(logout())

    // request 
    //     .get(`${baseUrl}/students`)
    //     .then(result => {
    //         dispatch({
    //             type: GET_ALL_STUDENT,
    //             payload: result.body.students
    //         })
    //     })
    // .catch(err => {console.error(err)})
    // };

  export const deleteStudent = (studentId) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    const batchId = ((window.location.href).split('/')[4])
    console.log((window.location.href).split('/')[4])
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .delete(`${baseUrl}/batches/${batchId}/students/${studentId}`)
      .then(result => {
        dispatch({
          type: DELETE_STUDENT_SUCCESS
        })
      })
      .catch(err => {
        if (err.status === 400) {
          dispatch({
            type: DELETE_STUDENT_FAILED,
            payload: err.response.body.message || 'Unknown error'
          })
        }
        else {
          console.error(err)
        }
      })
  }