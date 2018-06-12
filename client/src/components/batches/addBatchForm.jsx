import React, {PureComponent} from 'react'
import './newBatch.css'

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
				<div className="signup">
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
						placeholder="Start date: DD-MM-YYY" 
						id="startDate" 
						value={this.state.startDate || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="endDate" 
						name="endDate" 
						className="signupInfo"
						placeholder="End date: DD-MM-YYY" 
						id="endDate" 
						value={this.state.endDate || ''} 
						onChange={ this.handleChange } />
					</div>

					{/* {
						this.state.password &&
						this.state.confirmPassword &&
						this.state.password !== this.state.confirmPassword &&
						<p style={{color:'red'}}>The passwords do not match!</p>
					} */}

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