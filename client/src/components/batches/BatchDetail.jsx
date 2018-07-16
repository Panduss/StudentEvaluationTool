import React, {PureComponent} from 'react'
import {showBatch} from '../../actions/batches'
import {showStudent, deleteStudent} from '../../actions/student'
import {showEvaluation} from '../../actions/evaluation'
import GetRandom from './randomStudentGenerator'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import NewStudentPage from './addStudentPage'
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Avatar } from '@material-ui/core';

// const batchId = this.props.match.params.batchId

class BatchDetail extends PureComponent {

  componentWillMount() {

    const batchId = this.props.match.params.batchId

    if (this.props.authenticated) {
      this.props.showBatch(batchId)
    }
  }

  showStudent(studentId) {
    this.props.showStudent(studentId)
}

  showEvaluation(studentId) {
  this.props.showEvaluation(studentId)
}

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId)
  }

  calculatePercent() {
    const { students } = this.props

    const getEvals = students.filter(student => student.lastEvaluation !== "white")
    // console.log(getEvals, "evals?")
    const getRed = getEvals.filter(student => student.lastEvaluation === "red")
    // console.log(getRed, "reds?")
    const getYellow = getEvals.filter(student => student.lastEvaluation === "yellow")
    // console.log(getYellow, "yellows?")
    const getGreen = getEvals.filter(student => student.lastEvaluation === "green")
    // console.log(getGreen, "greens?")

    let bar = Array.prototype.concat.apply([], [getRed, getYellow, getGreen])

    // console.log(bar, "showmeabar")

    const redPercent = (getRed.length/getEvals.length * 100).toFixed()
    const yellowPercent = (getYellow.length/getEvals.length * 100).toFixed()
    const greenPercent = (getGreen.length/getEvals.length * 100).toFixed()

    
  return (
    <div>
      <h2>Latest evaluation for current batch:</h2>
        <div className="percentageBar">
              {bar.map(student => this.renderBoxes(student))}<br />
        </div>
        <p>Red Percentage: {redPercent}%</p>
        <p>Yellow Percentage: {yellowPercent}%</p>
        <p>Green Percentage: {greenPercent}%</p>
    </div>
  )

  }
  renderBoxes = (student) => {

    return (
      <button 
      key={student.id}
      className="progressionBar" 
      style={{background: `${student.lastEvaluation}`}}
      > </button>
    )
  }

  renderStudent = (student, batches) => {
   const batchId = batches[0].id
   console.log(batchId, "batcheeees")

    return (
      <Grid
      className="main"
      style={{
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gridAutoRows: 'minMax(50px, auto)',
      gridGap: '1rem',
      padding: '1rem',
      margin: 'auto'
  }}>
        <Card 
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}
            key={student.id}>
        <CardContent>
          <CardMedia
              className='media'
              style={{ objectFit: 'contain', width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto'}}
              image={student.profilePic}
              title="student's profile picture"
              />
            <Typography variant="headline">
                {student.firstName} {student.lastName}
            </Typography>
            <Typography>
                Last evaluation: {student.lastEvaluation}
            </Typography>
    
            <CardActions
                style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Link
                    to={`/batches/${batches.id}/students/${student.id}`}
                    style={{ textDecoration: 'none'}}>
                    <Button variant="contained" color="secondary" onClick={() => this.showStudent(student.id)}>More detail</Button>
                </Link>
                  <Button className="batchDetailButton" onClick={() => this.deleteStudent(student.id)}>Delete Student</Button>
      {/* <p className="studentName">{student.firstName} {student.lastName}</p>
      <p className="studentInfo" >Last evaluation: {(student.lastEvaluation).toUpperCase()}</p> */}
      </CardActions>
              </CardContent>
          </Card>
          </Grid>
    )}

  render() {
    const {students, batches, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (students === null) return null

    return (
      <div>
        <div className="percentages">
              {this.calculatePercent()}
        </div>
        <div className="batchPageButtons">
            <GetRandom />
        </div>
        <div className="batchPage">
            <div className="box">
                {students.map(student => this.renderStudent(student, batches))} 
            </div>
            <div className="box">
                <NewStudentPage />
          </div>
        </div>
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