import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newStudent} from '../../actions/student'
import AddStudentForm from './addStudentForm'
import {Redirect} from 'react-router-dom'
import './newBatch.css'

class NewStudentPage extends PureComponent {
    
    handleSubmit = (data) => {
		this.props.postNewStudent(data.firstName, data.lastName, data.profilePic, data.lastEvaluation="null", data.batchId)
	}

	render() {
		if (this.props.newStudent.success) return (
			<Redirect to="/batches" />
		)

		return (
			<div className="signup">
				<h1>Create a new student</h1>

				<AddStudentForm onSubmit={this.handleSubmit} />

				<p style={{color:'red'}}>{ this.props.newStudent.error }</p>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
        batchId : ((window.location.href).split('/')[4]),
        newStudent: state.newStudent,
        batches: state.batches
	}
}

export default connect(mapStateToProps, {postNewStudent: newStudent})(NewStudentPage)