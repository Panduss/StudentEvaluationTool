import React, {PureComponent} from 'react'
import './newBatch.css'

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
				<div className="signup">
					<div>
						<input 
						type="firstName" 
						name="firstName" 
						className="signupInfo"
						placeholder="First Name" 
						id="firstName" 
						value={this.state.firstName || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="lastName" 
						name="lastName" 
						className="signupInfo"
						placeholder="Last Name" 
						id="lastName" 
						value={this.state.lastName || ''} 
						onChange={ this.handleChange } />
					</div>

					<div>
						<input 
						type="profilePic" 
						name="profilePic" 
						className="signupInfo"
						placeholder="Profile Picture" 
						id="profilePic" 
						value={this.state.profilePic || ''} 
						onChange={ this.handleChange } />
					</div>

                    {/* <div>
						<input 
						type="lastEvaluation" 
						name="lastEvaluation" 
						className="signupInfo"
						placeholder="Last Evaluation" 
						id="lastEvaluation" 
						value={this.state.lastEvaluation || ''} 
						onChange={ this.handleChange } />
					</div> */}

                    <div>
						<input 
						type="remarks" 
						name="remark" 
						className="signupInfo"
						placeholder="Remark? Default: white" 
						id="remarks" 
						value={this.state.remarks || ''} 
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
						Create Student!
					</button>
				</div>
			</form>
		)
	}
}