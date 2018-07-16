import React, {PureComponent} from 'react'
import { TextField, Button } from '@material-ui/core';

export default class AddStudentForm extends PureComponent {
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
				<TextField
					required
					id="required"
					label="First name"
					name="firstName" 
					value={this.state.firstName || ''} 
					onChange={ this.handleChange } 
					style={{margin: '0.3rem'}}/>

				<TextField
					required
					id="required"
					label="Last name"
					name="lastName" 
					value={this.state.lastName || ''} 
					onChange={ this.handleChange } 
					style={{margin: '0.3rem'}}/>

				<TextField
					required
					id="required"
					label="Profile picture"
					name="profilePic" 
					value={this.state.profilePic || ''} 
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