import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_EVALUATION = "GET_EVALUATION"
export const ADD_EVALUATION = "ADD_EVALUATION"
export const LAST_EVAL_UPD = "LAST_EVAL_UPD"

  export const showEvaluation = (studentId) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt

    const batchId = ((window.location.href).split('/')[4])
    if (isExpired(jwt)) return dispatch(logout())

    // let studentId = Number((window.location.href).split('/').pop())
    request
    .get(`${baseUrl}/batches/${batchId}/students/${studentId}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => 
        dispatch({
            type: GET_EVALUATION,
            payload: result.body
        })
        )
    .catch(err => console.error(err))
    }

  export const newEvaluation = (studentId, batchId, colour, remarks ) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    const studentId = (window.location.href).split('/').pop()
    const batchId = ((window.location.href).split('/')[4])
    // const studentId = this.props.match.params.studentId
    // const batchId = this.props.match.params.batchId

    console.log(studentId, batchId, "studentandbatch")
  
    if (isExpired(jwt)) return dispatch(logout())

    request
        .post(`${baseUrl}/batches/${batchId}/students/${studentId}/evaluations`)
        .send({ student: studentId, batch: batchId, colour, remarks  })
        .then(result => {
            dispatch({
            type: ADD_EVALUATION,
            payload: result.body
            })
        })

    request
        .put(`${baseUrl}/batches/${batchId}/students/${studentId}`)
        .send({ studentId, batch: batchId, lastEvaluation: colour})
        .then(result => {
            dispatch({
                type: LAST_EVAL_UPD,
                payload: result.body
            })
        }) 
.catch(err => {console.error(err)})
}

// export const getEvaluations =

// export const updateLastEval = (student, batch, colour ) => (dispatch, getState) => {
//     const state = getState()
//     const jwt = state.currentUser.jwt

//     const studentId = (window.location.href).split('/').pop()
//     const batchId = ((window.location.href).split('/')[4])
//     console.log((window.location.href).split('/')[4])

//     request
//         .put(`${baseUrl}/batches/${batchId}/students/${studentId}`)
//         .send({ student: studentId, batch: batchId, lastEvaluation: colour})
//         .then(result => {
//             dispatch({
//                 type: LAST_EVAL_UPD,
//                 payload: result.body
//             })
//         })
//     .catch(err => {console.error(err)})
// }