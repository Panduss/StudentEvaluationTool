import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newEvaluation} from '../../actions/evaluation'
import AddEvaluationForm from './addEvaluationForm'
import {Redirect} from 'react-router-dom'
// import './newBatch.css'

class NewEvaluationPage extends PureComponent {
    
    handleSubmit = (data) => {
		this.props.postNewEvaluation(data.student, data.batch, data.colour, data.remarks)
	}

	render() {
		// if (this.props.newEvaluation) return (
		// 	<Redirect to="/batches" />
		// )

		return (
			<div className="signup">
				<h1>Create a new evaluation</h1>

				<AddEvaluationForm onSubmit={this.handleSubmit} />
                {/* <button type="submit" className="newBatchButton">Save!</button> */}
			</div>
		)
	}
}

const mapStateToProps = function (state) {

    console.log((window.location.href).split('/').pop(), "meow")
	return {
        batch : ((window.location.href).split('/')[4]),
        // newEvaluation: state.newStudent,
        student: (window.location.href).split('/').pop(),
	}
}

export default connect(mapStateToProps, {postNewEvaluation: newEvaluation})(NewEvaluationPage)