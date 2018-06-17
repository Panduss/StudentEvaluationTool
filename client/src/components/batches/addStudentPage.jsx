import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newStudent} from '../../actions/student'
import AddStudentForm from './addStudentForm'
// import './newBatch.css'

class NewStudentPage extends PureComponent {
    
    handleSubmit = (data) => {
		const {batchId} = this.props
		this.props.postNewStudent(data.firstName, data.lastName, data.profilePic, data.lastEvaluation, data.batchId)
	}

	render() {

		return (
			<div className="signup">
				<h1>Create a new student</h1>

				<AddStudentForm onSubmit={this.handleSubmit} />

			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
        batchId: state.batches.id,
        batches: state.batches
	}
}

export default connect(mapStateToProps, {postNewStudent: newStudent})(NewStudentPage)