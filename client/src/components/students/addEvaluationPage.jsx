import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newEvaluation} from '../../actions/evaluation'
import AddEvaluationForm from './addEvaluationForm'

class NewEvaluationPage extends PureComponent {
    
    handleSubmit = (data) => {
		this.props.postNewEvaluation(data.student, data.batch, data.colour, data.remarks)
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

    console.log((window.location.href).split('/').pop(), "meow")
	return {
        batch : ((window.location.href).split('/')[4]),
        student: (window.location.href).split('/').pop(),
	}
}

export default connect(mapStateToProps, {postNewEvaluation: newEvaluation})(NewEvaluationPage)