import React, {PureComponent} from 'react'
import TextField from '@material-ui/core/TextField';
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
				<div>
					<div>
						<TextField
							required
							id="required"
							label="Batch Number"
							name="batchNumber" 
							value={this.state.batchNumber || ''} 
							onChange={ this.handleChange } />
					</div>

					<div>
						<TextField
							required
							id="date"
							label="Start Date"
							name="startDate"
							type="date"
							// defaultValue="2017-05-24"
							InputLabelProps={{
							shrink: true,
							}}
							value={this.state.startDate || ''} 
							onChange={ this.handleChange } />
					</div>

					<div>
						<TextField
							required
							id="date"
							label="End Date"
							name="endDate"
							type="date"
							// defaultValue="2017-05-24"
							InputLabelProps={{
							shrink: true,
							}}
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