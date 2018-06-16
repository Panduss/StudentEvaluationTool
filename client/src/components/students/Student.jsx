import React, {PureComponent} from 'react'
import {showStudent} from '../../actions/student'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {showEvaluation} from '../../actions/evaluation'
import NewEvaluationPage from './addEvaluationPage'
import './student.css'

class ShowOneStudent extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.showStudent()
      this.props.showEvaluation()
    }
  }

  showEvaluation(studentId) {
    this.props.showEvaluation(studentId)
  }

  calculatePercent() {
    const { evaluations } = this.props

    const getRed = evaluations.filter(evalu => evalu.colour === "red")
    console.log(getRed, "reds?")
    const getYellow = evaluations.filter(evalu => evalu.colour === "yellow")
    console.log(getYellow, "yellows?")
    const getGreen = evaluations.filter(evalu => evalu.colour === "green")
    console.log(getGreen, "greens?")

    const redPercent = (getRed.length/evaluations.length * 100).toFixed()
    const yellowPercent = (getYellow.length/evaluations.length * 100).toFixed()
    const greenPercent = (getGreen.length/evaluations.length * 100).toFixed()

    return (
      <div>
          <p>Red Percentage: {redPercent}%</p>
          <p>Yellow Percentage: {yellowPercent}%</p>
          <p>Green Percentage: {greenPercent}%</p>
    </div>
    )
  }

  renderBoxes = (evaluations) => {

    return (
      <button 
      key={evaluations.id}
      className="progressionBar" 
      style={{background: `${evaluations.colour}`}}
      > </button>
    )
  }

  renderOneStudent = (student) => {

    return (

      <div>
        <div 
          className="studentInfo"
          key={student.id} 
          style={{backgroundColor: `${student.lastEvaluation}`}}
          >
            <p className="studentName">{student.firstName} {student.lastName}</p>
            <img className="studentPicture" src={student.profilePic} alt={student.firstName}/>
            <p className="studentInfo">Last evaluation: {(student.lastEvaluation).toUpperCase()}</p>
        </div>
      </div>
    )}



  render() {
    const { evaluations, students, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
    )
    if (students === null) return null
    if (evaluations === null) return null

    return (
      <div className="studentPage">
        <div>
          <h2>Student's progression: </h2> 
          <h2 className="stat">{evaluations.map(evaluation => this.renderBoxes(evaluation))}</h2>
      </div><br />
      <div>
      <div className="percentages">
              {this.calculatePercent()}
        </div>
      </div>
      <div className="evaluation">
        <div className="box" >
            {students.map(student => this.renderOneStudent(student))}
          </div>
          <div className="box">
            <NewEvaluationPage />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    authenticated: state.currentUser !== null,
    students: state.students,
    evaluations: state.evaluations
  
  }
}

export default connect(mapStateToProps, {showStudent, showEvaluation})(ShowOneStudent)