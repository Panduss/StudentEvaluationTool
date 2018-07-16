import React, {PureComponent} from 'react'
import { TextField, Button, Paper } from '@material-ui/core';
import { Grid, Card, CardContent } from 'material-ui';

export default class LoginForm extends PureComponent {
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
					id="required"
					label="Your e-mail address"
					name="email"
					id="email" 
					value={ this.state.email || ''} 
					onChange={ this.handleChange } 
					style={{margin: '0.3rem'}}/>
				</div>
				<div>
				<TextField
					required
					id="required"
					label="Your password"
					type="password"
					name="password"
					id="password" 
					value={this.state.password || ''} 
					onChange={ this.handleChange } 
					style={{margin: '0.3rem'}}/>
				</div>
				<div>
				<Button 
					type="submit"
					variant="contained" 
					color="secondary"
					type="submit"
					style={{margin: '1.5rem'}}>
					Login
				</Button>
				</div>	
			</form>
		)
	}
}