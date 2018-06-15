import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {newBatch} from '../../actions/batches'
import AddBatchForm from './addBatchForm'
import {Redirect} from 'react-router-dom'
import './newBatch.css'

class NewBatchPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postNewBatch(data.batchNumber, data.startDate, data.endDate)
	}

	render() {
		// if (this.props.newBatch !== null) return (
		// 	<Redirect to="/batches" />
		// )

		return (
			<div>
				<h1>Create a new batch</h1>

				<AddBatchForm onSubmit={this.handleSubmit} />
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		newBatch: state.newBatch
	}
}

export default connect(mapStateToProps, {postNewBatch: newBatch})(NewBatchPage)