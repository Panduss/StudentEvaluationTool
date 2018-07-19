import React, {PureComponent} from 'react'
import {showBatch} from '../../actions/batches'
import {showStudent, deleteStudent} from '../../actions/student'
import {showEvaluation} from '../../actions/evaluation'
import GetRandom from './randomStudentGenerator'
import NewStudentPage from './addStudentPage'
import {connect} from 'react-redux'
import {Redirect } from 'react-router-dom'
import ShowStudents from '../students/ShowStudents'
import { Paper, Button, Typography } from '@material-ui/core';

// const batchId = this.props.match.params.batchId

class BatchDetail extends PureComponent {

  componentWillMount() {
    const batchId = this.props.match.params.batchId

    if (this.props.authenticated) {
      this.props.showBatch(batchId)
    }
  }

  showEvaluation(studentId) {
  this.props.showEvaluation(studentId)
}

  calculatePercent() {
    const { students } = this.props

    const getEvals = students.filter(student => student.lastEvaluation.split('/')[0] !== "white")
    // console.log(getEvals, "evals?")
    const getRed = getEvals.filter(student => student.lastEvaluation.split('/')[0] === "red")
    // console.log(getRed, "reds?")
    const getYellow = getEvals.filter(student => student.lastEvaluation.split('/')[0] === "yellow")
    // console.log(getYellow, "yellows?")
    const getGreen = getEvals.filter(student => student.lastEvaluation.split('/')[0] === "green")
    // console.log(getGreen, "greens?")

    let bar = Array.prototype.concat.apply([], [getRed, getYellow, getGreen])

    // console.log(bar, "showmeabar")

    const redPercent = (getRed.length/getEvals.length * 100).toFixed(2)
    const yellowPercent = (getYellow.length/getEvals.length * 100).toFixed(2)
    const greenPercent = (getGreen.length/getEvals.length * 100).toFixed(2)

    
  return (
      <Paper style={{
        marginTop: '30px', 
        marginLeft: 'auto', 
        marginBottom: '30px', 
        marginRight: 'auto',
        padding: '20px',
        width: '90%'}}>
        <Typography variant="headline"> Latest evaluation for current batch: </Typography>
        <br />
        <Button style={{width: Math.round( redPercent ) + '%', borderRadius: 0, backgroundColor: '#e57373', textShadow: '0px 1px #cc2a48', float: "left", textAlign: "center"}}>{Math.floor(redPercent)}%</Button>        
        <Button style={{width: Math.round( yellowPercent ) + '%', borderRadius: 0, backgroundColor: '#fff176', textShadow: '0px 1px #ccc12a', float: "left", textAlign: "center"}}>{Math.floor(yellowPercent)}%</Button>
        <Button style={{width: Math.round( greenPercent ) + '%', borderRadius: 0, backgroundColor: '#81c784', textShadow: '0px 1px #4acc2a', float: "left", textAlign: "center"}}>{Math.floor(greenPercent)}%</Button>
        <br />
        <GetRandom />
        <ShowStudents />
      </Paper>
  )

  }

  render() {
    const {students,authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (students === null) return null

    return (
      <div>
          <NewStudentPage />
          {this.calculatePercent()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  authenticated: state.currentUser !== null,
  students: state.students,
  batches: state.batches

  }
}

export default connect(mapStateToProps, { showBatch, showStudent, showEvaluation, deleteStudent })(BatchDetail)