import React, {PureComponent} from 'react'

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
				<div className="login">
					<div>
						<input 
						type="email" 
						name="email"
						className="loginInfo"
						placeholder="Your e-mail" 
						id="email" 
						value={ this.state.email || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="password" 
						name="password" 
						className="loginInfo"
						placeholder="Your password" 
						id="password" 
						value={this.state.password || ''} 
						onChange={ this.handleChange } />
					</div>

					<button 
						className="loginButton"
						type="submit">
						Login
					</button>	
				</div>
			</form>
		)
	}
}