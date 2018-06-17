import React, {PureComponent} from 'react'
import {showStudent} from '../../actions/student'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {showEvaluation, newEvaluation} from '../../actions/evaluation'
import AddEvaluationForm from './addEvaluationForm'
// import {baseUrl} from '../../constants'
import './student.css'

class ShowOneStudent extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.showStudent()
      this.props.showEvaluation()
    }
  }

  handleSubmit = (data) => {
		const {studentId} = this.props

		this.props.postNewEvaluation(data.studentId, data.batchId, data.colour, data.remarks)

		// if(data) return (
		// 	<Redirect to="/batches/batchId" />
		// )
	}

  showEvaluation(studentId) {
    this.props.showEvaluation(studentId)
  }

  calculatePercent() {
    const { evaluations } = this.props

    const getRed = evaluations.filter(evalu => evalu.colour === "red")
    // console.log(getRed, "reds?")
    const getYellow = evaluations.filter(evalu => evalu.colour === "yellow")
    // console.log(getYellow, "yellows?")
    const getGreen = evaluations.filter(evalu => evalu.colour === "green")
    // console.log(getGreen, "greens?")

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
    const { batchId, studentId, evaluations, students, authenticated} = this.props

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
            <h1>Create a new evaluation</h1>
				    <AddEvaluationForm onSubmit={this.handleSubmit} />
            <button>
            <Link to={`/batches/${batchId}`}>Batch</Link></button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
console.log((window.location.href).split('/')[4], "meowmeow")
  return {
    authenticated: state.currentUser !== null,
    students: state.students,
    evaluations: state.evaluations,
    batchId : state.batches.id,
		studentId: state.students.id
  
  }
}

export default connect(mapStateToProps, {showStudent, showEvaluation, postNewEvaluation: newEvaluation})(ShowOneStudent)