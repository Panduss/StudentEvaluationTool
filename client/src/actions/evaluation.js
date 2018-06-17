import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const GET_EVALUATION = "GET_EVALUATION"
export const ADD_EVALUATION = "ADD_EVALUATION"
export const LAST_EVAL_UPD = "LAST_EVAL_UPD"

  export const showEvaluation = (studentId) => (dispatch) => {

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

  export const newEvaluation = (student, batch, colour, remarks ) => (dispatch) => {

    const studentId = (window.location.href).split('/').pop()
    const batchId = ((window.location.href).split('/')[4])


    request
        .post(`${baseUrl}/students/${studentId}/evaluations`)
        .send({ student: studentId, batch: batchId, colour, remarks  })
        .then(response => {
            dispatch({
            type: ADD_EVALUATION,
            payload: response.body
            })
        })

    request
    .put(`${baseUrl}/students/${studentId}`)
    .send({ student: studentId, batch: batchId, lastEvaluation: colour})
    .then(response => {
        dispatch({
            type: LAST_EVAL_UPD,
            payload: response.body
        })
    }) 
.catch(err => {console.error(err)})
}