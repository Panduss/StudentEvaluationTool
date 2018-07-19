import React, {PureComponent} from 'react'
import {showStudent} from '../../actions/student'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {showEvaluation, newEvaluation} from '../../actions/evaluation'
import AddEvaluationForm from './addEvaluationForm'
import { Button, Grid, CardActions, CardContent, CardMedia, Typography, Paper } from '@material-ui/core';

class ShowOneStudent extends PureComponent {

  componentWillMount() {
    const studentId = this.props.match.params.studentId

    if (this.props.authenticated) {
      this.props.showStudent(studentId)
      this.props.showEvaluation(studentId)
    }
  }

  handleSubmit = (data) => {
    const {students, batches} = this.props
    let studentId = students.map(student => student.id)
    let batchId = batches.map(batch => batch.id)

		this.props.postNewEvaluation(data.studentId, data.batchId, data.colour, data.remarks)

	}

  showEvaluation(studentId) {
    this.props.showEvaluation(studentId)
    
  }

  calculatePercent() {
    const { evaluations } = this.props

    const getRed = evaluations.filter(evalu => evalu.colour === "red/#e57373")
    const getYellow = evaluations.filter(evalu => evalu.colour === "yellow/#fff176")
    const getGreen = evaluations.filter(evalu => evalu.colour === "green/#81c784")

    let redPercent = (getRed.length/evaluations.length * 100).toFixed()
    let yellowPercent = (getYellow.length/evaluations.length * 100).toFixed()
    let greenPercent = (getGreen.length/evaluations.length * 100).toFixed()


    if (isNaN(redPercent)) redPercent = 0 
    if (isNaN(yellowPercent)) yellowPercent = 0
    if (isNaN(greenPercent)) greenPercent = 0

    return (
      <div>
          <br />
              <Typography variant="subheading">Red: {redPercent}%</Typography>
              <Typography variant="subheading">Yellow: {yellowPercent}%</Typography>
              <Typography variant="subheading">Green: {greenPercent}%</Typography>
          <br />
      </div>
    )
  }

  renderBoxes = (evaluations) => {

    return (
      <span style={{width: '90%'}}>
      <Button 
      key={evaluations.id}
      style={{border: '1px solid black', background: `${evaluations.colour}`.split('/')[1], borderRadius: '0'}}
      />
      </span>
    )
  }


  render() {
    const { batches, evaluations, students, authenticated} = this.props

    // console.log(this.props, "propospob")

    if (!authenticated) return (
			<Redirect to="/login" />
    )
    if (students === null) return null
    if (evaluations === null) return null

    return (
      <Grid container spacing={16}
            style={{
              display: 'flex',
              flexDirection: 'row wrap',
              padding: 20,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Grid item xs={'auto'}>
                {students.map(student => (
                <Paper 
                    style={{
                        flex: 1,
                        margin: 10,
                        textAlign: 'center',
                        padding: 10,
                        backgroundColor: `${student.lastEvaluation.split('/')[1]}`
                }}>
                    <CardContent>
                        <CardMedia
                            className='media'
                            style={{ objectFit: 'contain', width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto'}}
                            image={student.profilePic}
                            title="student's profile picture"
                        />
                        <Typography style={{margin: '1.5rem'}} variant="headline">
                            {student.firstName} {student.lastName}
                        </Typography>
                    </CardContent>
                </Paper>
                ))}
            </Grid>

            <Grid item xs={'auto'}>
                <Paper
                    style={{
                      flex: 4,
                      margin: 10,
                      textAlign: 'center'
                }}>
                    <CardContent>
                        <Typography variant="headline">Student's progression: </Typography> 
                            {evaluations.map(evaluation => this.renderBoxes(evaluation))}
                            {this.calculatePercent()}
                
                        <Typography variant="headline">Create a new evaluation</Typography>
                            <AddEvaluationForm onSubmit={this.handleSubmit} />
                        
                        <CardActions 
                            style={{ 
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}>
                          {batches.map(batch => (
                              <Link 
                                  to={`/batches/${batch.id}`}
                                  style={{ textDecoration: 'none'}}>
                                  <Button variant="contained" color="secondary">Back to Batch</Button>
                            </Link>
                            ))}
                        </CardActions>
                    </CardContent>
                </Paper>
            </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.currentUser !== null,
    students: state.students,
    evaluations: state.evaluations,
    batches: state.batches
  }
}

export default connect(mapStateToProps, {showStudent, showEvaluation, postNewEvaluation: newEvaluation})(ShowOneStudent)