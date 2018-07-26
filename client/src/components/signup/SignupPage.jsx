import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {signup} from '../../actions/users'
import SignupForm from './SignupForm'
import {Redirect} from 'react-router-dom'
import { Paper } from '@material-ui/core';

class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postSignup(data.firstName, data.lastName, data.email, data.password)
	}

	render() {
		if (this.props.signup.success) return (
			<Redirect to="/" />
		)

		return (
			<Paper					
			style={{
			display: 'grid',
			maxWidth: '30%',
			textAlign: 'center',
			justifyContent: 'center',
			padding: '3rem',
			margin: 'auto',
			alignItems: 'center'
			}}>
				<h1>Sign up</h1>

				<SignupForm onSubmit={this.handleSubmit} />

				<p style={{color:'red'}}>{ this.props.signup.error }</p>
			</Paper>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps, {postSignup: signup})(SignupPage)