import React, {PureComponent} from 'react'
import {showStudent} from '../../actions/student'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './student.css'

class ShowOneStudent extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.student === null) this.props.showStudent()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderOneStudent = (one) => {
    const { student } = this.props

    return (
    <div 
    key={one.id} 
    className="students"
    >
            <p className="studentName">Name: {one.firstName} {one.lastName}</p>
            <img className="studentPicture" src={one.profilePic} />
            <p className="studentInfo">Last evaluation: {one.lastEvaluation}</p>
    </div>
    )}

  render() {
    const {student, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (student === null) return null

    return (
      <div>
        {student.map(one => this.renderOneStudent(one))}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  student: state.student
  
})

export default connect(mapStateToProps, {showStudent})(ShowOneStudent)