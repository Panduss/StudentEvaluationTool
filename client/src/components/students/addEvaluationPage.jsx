import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newEvaluation} from '../../actions/evaluation'
import AddEvaluationForm from './addEvaluationForm'

class NewEvaluationPage extends PureComponent {
    
    handleSubmit = (data) => {
		const {batchId, studentId} = this.props

		// const firstName = students.map(student => student.firstName)

		this.props.postNewEvaluation(data.studentId, data.batchId, data.colour, data.remarks)
	}

	render() {

		return (
			<div>
				<h1>Create a new evaluation</h1>
				<AddEvaluationForm onSubmit={this.handleSubmit} />
			</div>
		)
	}
}

const mapStateToProps = function (state) {

    // console.log((window.location.href).split('/').pop(), "meow")
	return {
        batchID : ((window.location.href).split('/')[4]),
		studentId: ((window.location.href).split('/').pop())
	}
}

export default connect(mapStateToProps, {postNewEvaluation: newEvaluation})(NewEvaluationPage)