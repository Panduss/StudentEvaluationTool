import React, {PureComponent} from 'react'
import {showStudent} from '../../actions/student'
// import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {showEvaluation, newEvaluation} from '../../actions/evaluation'
import NewEvaluationPage from './addEvaluationPage'
import './student.css'

class ShowOneStudent extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.student === null) this.props.showStudent()
      if (this.props.evalus === null) this.props.showEvaluation()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  showEvaluation(studentId) {
    this.props.showEvaluation(studentId)
  }


  renderBoxes = (evalu) => {
    const { evalus } = this.props

    return (
      <button 
      key={evalu.id}
      className="progressionBar" 
      style={{background: `${evalu.colour}`}}
      > </button>
    )
  }

  renderOneStudent = (one) => {
    const { student } = this.props

    return (

      <div>
        <div 
          key={one.id} 
          className="student"
          >
            <p className="studentName">{one.firstName} {one.lastName}</p>
            <img className="studentPicture" src={one.profilePic} />
            <p className="studentInfo">Last evaluation: {(one.lastEvaluation).toUpperCase()}</p>
            <button onClick={() => this.showEvaluation(one.id)}>Show Evaluation</button>
        </div>
      </div>
    )}



  render() {
    const { evalus, student, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
    )
    if (student === null) return null

    return (
      <div>
        <div>
          Student's progression: 
          {evalus.map(evalu => this.renderBoxes(evalu))}
      </div>
      <div className="studentPage">
          {student.map(one => this.renderOneStudent(one))}
        </div>
        <div className="studentPage">
          <NewEvaluationPage />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  // console.log(state.oneStudent.map(a => a.evalu), "hiii")

  return {
  authenticated: state.currentUser !== null,
  student: state.oneStudent,
  evalus: state.oneEvaluation
  
  }
}

export default connect(mapStateToProps, {showStudent, showEvaluation})(ShowOneStudent)