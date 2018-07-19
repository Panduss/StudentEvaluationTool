import React, {PureComponent} from 'react'
import {showBatch} from '../../actions/batches'
import { showStudent, deleteStudent } from '../../actions/student'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

class ShowStudents extends PureComponent {

  showEvaluation(studentId) {
    this.props.showEvaluation(studentId)
  }

  showStudent(studentId) {
      this.props.showStudent(studentId)
  }

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId)
  }

  render = () => {
    if (!this.props.authenticated) {
        return <Redirect to="/login" />
      }
      if (
        !this.props.students
      ) {
        return <div>Create a student!</div>
      }

      const {students, batches} = this.props
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
        {students.map(student => (
        <Card 
            style={{
                textAlign: 'center',
                backgroundColor: `${student.lastEvaluation.split('/')[1]}`
            }}
            key={student.id}>
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
    
            <CardActions
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            {batches.map(batch =>
                <Link
                    to={`/batches/${batch.id}/students/${student.id}`}
                    style={{ textDecoration: 'none'}}>
                    <Button
                        variant="fab"
                        style={{backgroundColor: 'white', color: '#CDDC39', margin: '1rem'}}
                        onClick={() => this.showStudent(student.id)}>
                        <VisibilityIcon />
                    </Button>
                </Link>
              )}
                  <Button 
                        variant="fab"
                        style={{backgroundColor: 'white', color: '#00796B', margin: '1rem'}}  
                        onClick={() => this.deleteStudent(student.id)}>
                        <DeleteIcon />
                  </Button>
            </CardActions>
              </CardContent>
          </Card>
            ))}
        </Grid>
    )}
}

const mapStateToProps = state => {
  return {
  authenticated: state.currentUser !== null,
  students: state.students,
  batches: state.batches

  }
}

export default connect(mapStateToProps, { showBatch, showStudent, deleteStudent })(ShowStudents)