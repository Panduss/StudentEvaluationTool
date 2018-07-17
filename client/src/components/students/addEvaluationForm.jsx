import React, {PureComponent} from 'react'

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
						<input 
						type="remarks" 
            name="remarks" 
            className="newEval"
						placeholder="Remarks" 
						id="remarks" 
						value={this.state.remarks || ''} 
						onChange={ this.handleChange } />
					</div>

          {/* <div>
						<input 
						type="colour" 
            name="colour" 
            className="newEval"
						placeholder="Colour" 
						id="colour" 
						value={this.state.colour || ''} 
						onClick={ this.handleChange } />
					</div> */}

					<span>
            <button
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
            <button 
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
            <button
            style={{background: "#81c784"}} 
						type="radio"
						name="colour" 
						className="evalButton"
						id="green" 
						value="green/#81c784"
						label="Green"
						onClick={ this.handleChange } />
					</span>

                    {/* <div>
						<input 
						type="batch" 
						name="batch" 
						className="signupInfo"
						placeholder="Batch Number" 
						id="batch" 
						value={this.state.batch || ''} 
						onChange={ this.handleChange } />
					</div> 

          <button 
          type="submit" 
          className="newEvalButton"
          >
          Save
          </button>*/}
				</div>
			</form>
		)
	}
}