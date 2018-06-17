import React, {PureComponent} from 'react'
// import './newBatch.css'

export default class AddBatchForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<div>
						<input 
						type="batchNumber" 
						name="batchNumber" 
						className="signupInfo"
						placeholder="Batch number" 
						id="batchNumber" 
						value={this.state.batchNumber || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="startDate" 
						name="startDate" 
						className="signupInfo"
						placeholder="Start date: MM/DD/YYYY" 
						id="startDate" 
						value={this.state.startDate || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="endDate" 
						name="endDate" 
						className="signupInfo"
						placeholder="End date: MM/DD/YYYY" 
						id="endDate" 
						value={this.state.endDate || ''} 
						onChange={ this.handleChange } />
					</div>

					<button 
						type="submit"
						className="newBatchButton"
						>
						Create Batch!
					</button>
				</div>
			</form>
		)
	}
}