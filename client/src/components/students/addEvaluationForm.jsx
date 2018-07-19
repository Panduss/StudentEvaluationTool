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
					
					<br />

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

					<br />

					<span>
            <Button
            style={{background: "#e57373", margin: '2px'}} 
						type="radio"
						name="colour" 
						className="evalButton"
						id="red" 
						value="red/#e57373" 
						onClick={ this.handleChange } />					
					</span>

					<span>
            <Button 
            style={{background: "#fff176", margin: '2px'}} 
						type="radio"
						name="colour" 
						className="evalButton"
						id="yellow" 
						value="yellow/#fff176" 
						onClick={ this.handleChange } />
					</span>

          <span>
            <Button
            style={{background: "#81c784", margin: '2px'}} 
						type="radio"
						name="colour" 
						id="green" 
						value="green/#81c784"
						onClick={ this.handleChange } />
					</span>
			</form>
		)
	}
}