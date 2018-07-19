import React, {PureComponent} from 'react'
import { Button, TextField } from '@material-ui/core';

export default class AddEvaluationForm extends PureComponent {
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
				<div className="evaluationForm">
					<div>
						<TextField 
						type="remarks" 
            name="remarks" 
            className="newEval"
						placeholder="Remarks" 
						id="remarks" 
						value={this.state.remarks || ''} 
						onChange={ this.handleChange } />
					</div>

					<span>
            <Button
            style={{background: "#e57373"}} 
						type="radio"
						name="colour" 
						className="evalButton"
						id="red" 
						value="red/#e57373" 
						label="Red"
						onClick={ this.handleChange } />					
					</span>

					<span>
            <Button 
            style={{background: "#fff176"}} 
						type="radio"
						name="colour" 
						className="evalButton"
						id="yellow" 
						value="yellow/#fff176" 
						label="Yellow"
						onClick={ this.handleChange } />
					</span>

          <span>
            <Button
            style={{background: "#81c784"}} 
						type="radio"
						name="colour" 
						className="evalButton"
						id="green" 
						value="green/#81c784"
						label="Green"
						onClick={ this.handleChange } />
					</span>
				</div>
			</form>
		)
	}
}