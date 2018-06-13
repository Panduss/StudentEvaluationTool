import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

class ShowPerc extends PureComponent {

  renderBoxes = (evalu) => {
    const { evalus } = this.props

    return (
      <button 
      key={evalu.id}
      className="progressionBar" 
      style={{background: `${evalu.colour}`}}
      >hi </button>
    )
  }

  render() {
    const { evalus=evalus[0] , student, authenticated} = this.props
    console.log(evalus, 'bye')
    return (
        <div>
          Student's progression: 
          {evalus.map(evalu => this.renderBoxes(evalu))}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(state.oneStudent.map(a => a.evalu)[0], "hiii")

  return {
  evalus: state.oneStudent.map(a => a.evalu)
  
  }
}

export default connect(mapStateToProps)(ShowPerc)