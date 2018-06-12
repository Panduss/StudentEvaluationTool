import React, {PureComponent} from 'react'
import {showBatches, showBatch} from '../../actions/batches'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import './batch.css'

class BatchList extends PureComponent {


componentWillMount() {
    this.props.showBatches()
        if (this.props.authenticated) {
        if (this.props.batches === null) this.props.showBatches()
        if (this.props.users === null) this.props.getUsers()
    }
}

showBatch(batchId) {
    this.props.showBatch(batchId)

}

  renderBatch = (batch) => {
    const { batches } = this.props

    return (
    <div key={batch.id} className="game-card">
        <div className="batches">
            <Link
                className="link"
                to={`/batches/${batch.id}`}
                onClick={() => this.showBatch(batch.id)}>
                <p className="batchName">Batch #{batch.batchNumber}</p>
            </Link>
                <p className="batchInfo">Date: {batch.startDate} - {batch.endDate}</p>
        </div>
    </div>
)}

  render() {
    const {batches, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
        )
        

    if (batches === null) return null

    return (
      <div>
        {batches.map(batch => this.renderBatch(batch))
    }
      </div>
    )
  }
}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    batches: state.batches === null ?
    null : Object.values(state.batches).sort((a, b) => a.id - b.id)
})

export default connect(mapStateToProps, {showBatches, showBatch})(BatchList)