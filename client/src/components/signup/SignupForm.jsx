import React, {PureComponent} from 'react'
import './signup.css'

export default class SignupForm extends PureComponent {
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
						type="firstName" 
						name="firstName" 
						className="signupInfo"
						placeholder="First name" 
						id="firstName" 
						value={this.state.firstName || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="lastName" 
						name="lastName" 
						className="signupInfo"
						placeholder="Last name" 
						id="lastName" 
						value={this.state.lastName || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="email" 
						name="email" 
						className="signupInfo"
						placeholder="E-mail" 
						id="email" 
						value={this.state.email || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="password" 
						name="password" 
						className="signupInfo"
						placeholder="Password" 
						id="password" 
						value={this.state.password || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="password" 
						name="confirmPassword" 
						className="signupInfo"
						placeholder="Confirm password" 
						id="confirmPassword" 
						value={this.state.confirmPassword || ''} 
						onChange={ this.handleChange } />
					</div>

					{
						this.state.password &&
						this.state.confirmPassword &&
						this.state.password !== this.state.confirmPassword &&
						<p style={{color:'red'}}>The passwords do not match!</p>
					}

					<button 
						type="submit"
						className="signupButton"
					>
						Sign me up!
					</button>
				</div>
			</form>
		)
	}
}