import React, {PureComponent} from 'react'
import {showBatch} from '../../actions/batches'
import {showStudent, deleteStudent} from '../../actions/student'
import {showEvaluation} from '../../actions/evaluation'
import GetRandom from './randomStudentGenerator'
import NewStudentPage from './addStudentPage'
import {connect} from 'react-redux'
import {Redirect } from 'react-router-dom'
import ShowStudents from '../students/ShowStudents'
import { LinearProgress, Paper, Button, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import {Doughnut, HorizontalBar} from 'react-chartjs-2';


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

const data = {
	labels: [
		'Red',
		'Yellow',
		'Green'
	],
	datasets: [{
		data: [redPercent, yellowPercent, greenPercent],
		backgroundColor: [
		'#e57373',
		'#fff176',
		'#81c784'
		],
		hoverBackgroundColor: [
		'#FF5252',
		'#FFEB3B',
		'#4CAF50'
		]
	}]
};

const data2 = {
  labels: ['January' ],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65 + 59 + 80]
    }
  ]
};

    
  return (
      <Paper style={{
        marginTop: '30px', 
        marginLeft: 'auto', 
        marginBottom: '30px', 
        marginRight: 'auto',
        padding: '20px',
        width: '90%',
        textAlign: 'center'}}
        >
        <Typography style={{paddingTop: '2%'}} variant="headline"> Latest evaluation for current batch: </Typography>
          <div style={{maxWidth:"500px", margin: 'auto'}}>
              <Doughnut data={data}/>
          </div>
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