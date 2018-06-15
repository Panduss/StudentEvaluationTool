import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'
import {showBatch} from './batches'
// import {batchId} from '../constants'

export const GET_EVALUATION = "GET_EVALUATION"
export const GET_STUDENT = 'GET_STUDENT'
export const GET_ALL_STUDENT = "GET_ALL_STUDENT"
export const ADD_STUDENT = "ADD_STUDENT"

export const DELETE_STUDENT = "DELETE_STUDENT"


const allStudents = students => ({
    type: GET_ALL_STUDENT,
    payload: students
})

const addStudent = student => ({
    type: ADD_STUDENT,
    payload: student
})

// const exterminate = studentId => ({
//   type: DELETE_STUDENT,
//   payload: studentId
// })


export const showStudent = (studentId) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
     
    const batchId = ((window.location.href).split('/')[4])
    console.log((window.location.href).split('/'))
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/batches/${batchId}/students/${studentId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => 
        dispatch({
            type: GET_STUDENT,
            payload: result.body,
        }
    ))
      .catch(err => console.error(err))
  }

  export const newStudent = ( student ) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    const batchId = ((window.location.href).split('/')[4])
    console.log((window.location.href).split('/')[4])
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .post(`${baseUrl}/batches/${batchId}/students`)
      .send({ student })
      .then(result => {
        dispatch({
        type: ADD_STUDENT,
        payload: student
      })
    })
      .catch(err => console.error(err))
    }

  export const getAllStudent = (batchId) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null

    const batchId = ((window.location.href).split('/')[4])
    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())

    request
      .get(`${baseUrl}/batches/${batchId}/students`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => {
        dispatch({
          type: GET_ALL_STUDENT,
          payload: result.body
    })
  })
  .catch(err => console.error(err))
}

  export const deleteStudent = (id) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())
    
    request
    .delete(`${baseUrl}/students/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: DELETE_STUDENT,
      payload: id
    }))
  }

    // export const deleteStudent = (id) => (dispatch, getState) => {
    //   const state = getState()
    //   const jwt = state.currentUser.jwt
    
    //   if (isExpired(jwt)) return dispatch(logout())
    
    //   request
    //     .delete(`${baseUrl}/students/${studentId}`)
    //     .then(result => {
    //       dispatch(exterminate(studentId))
    //     })
    //   .catch(err => console.error(err))
    //   }