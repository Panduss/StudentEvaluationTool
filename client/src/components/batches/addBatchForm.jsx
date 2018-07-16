import React, {PureComponent} from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

export default class AddBatchForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	closeModal() {
		this.setState({modalIsOpen: false});
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
			
				<TextField
					required
					id="required"
					label="Batch Number"
					name="batchNumber" 
					value={this.state.batchNumber || ''} 
					onChange={ this.handleChange } 
					style={{margin: '0.3rem'}}/>

				<TextField
					required
					id="datetime"
					type="date"
					label="Start Date"
					name="startDate"
					type="date"
					InputLabelProps={{
					shrink: true,
					}}
					value={this.state.startDate || ''} 
					onChange={ this.handleChange } 
					style={{margin: '0.3rem'}}/>

				<TextField
					required
					id="datetime"
					type="date"
					label="End Date"
					name="endDate"
					type="date"
					InputLabelProps={{
					shrink: true,
					}}
					value={this.state.endDate || ''} 
					onChange={ this.handleChange } 
					style={{margin: '0.3rem'}}/>

				<Button
					type="submit"
					variant="contained" 
					color="secondary"
					style={{margin: '1.5rem'}}
					>
					Create & Close
				</Button>
			</form>
		)
	}
}