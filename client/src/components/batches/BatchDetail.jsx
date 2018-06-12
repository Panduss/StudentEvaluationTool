import React, {PureComponent} from 'react'
import {showBatch} from '../../actions/batches'
import {showStudent} from '../../actions/student'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './batch.css'

class BatchDetail extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.oneBatch === null) this.props.showBatch()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  showStudent(studentId) {
    this.props.showStudent(studentId)

}

  renderStudent = (student) => {
    const { students } = this.props

    return (
        <div 
        key={student.id} 
        className="students">
            <Link
                className="link"
                to={`/students/${student.id}`}
                onClick={() => this.showStudent(student.id)}
                >
                <p className="studentName">Name: {student.firstName} {student.lastName}</p>
            </Link>
            <p className="studentInfo">Last evaluation: {student.lastEvaluation}</p>
    </div>
    )}

  render() {
    const {students, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (students === null) return null

    return (
      <div>
        {students.map(student => this.renderStudent(student))}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  students: state.oneBatch
  
})

export default connect(mapStateToProps, {showBatch, showStudent})(BatchDetail)