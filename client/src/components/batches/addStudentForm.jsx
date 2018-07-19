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
				<div>
					<TextField
						required
						id="firsName"
						label="First name"
						name="firstName" 
						value={this.state.firstName || ''} 
						onChange={ this.handleChange } 
						style={{margin: '0.3rem'}}/>
				</div>
				<div>
					<TextField
						required
						id="lastName"
						label="Last name"
						name="lastName" 
						value={this.state.lastName || ''} 
						onChange={ this.handleChange } 
						style={{margin: '0.3rem'}}/>
				</div>
				<div>
					<TextField
						required
						id="profilePic"
						label="Profile picture"
						name="profilePic" 
						value={this.state.profilePic || ''} 
						onChange={ this.handleChange } 
						style={{margin: '0.3rem'}}/>
				</div>
				<div>
					<Button
						type="submit"
						variant="contained" 
						color="secondary"
						style={{margin: '1.5rem'}}
						>
						Create & Close
					</Button>
				</div>
			</form>
		)
	}
}