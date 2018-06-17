import React, {PureComponent} from 'react'
import {showBatches, showBatch, newBatch, deleteBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import NewBatchPage from './addBatchPage'
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
    console.log(batchId, "log form batchlist component")
    this.props.showBatch(batchId)
}

newBatch() {
    this.props.addBatch()
}

deleteBatch(batchId) {
    this.props.deleteBatch(batchId)
  }

  renderBatch = (batch) => {

    return (
    <div key={batch.id}>
        <div className="batches">
            <Link
                className="link"
                to={`/batches/${batch.id}`}
                onClick={() => this.showBatch(batch.id)}>
                <p className="batchName">Batch #{batch.batchNumber}</p>
            </Link>
                <p className="batchInfo">Date: {batch.startDate} - {batch.endDate}</p>
                <button className="batchDetailButton" onClick={() => this.deleteBatch(batch.id)}>Delete Batch</button>
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
    <div className="batchPage">
        <div>
            <div className="box">
                {batches.map(batch => this.renderBatch(batch))}
            </div>          
            <div className="box">
                <NewBatchPage />
            </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    batches: state.batches === null ?
    null : Object.values(state.batches).sort((a, b) => a.id - b.id)
})

export default connect(mapStateToProps, {showBatches, showBatch, newBatch, deleteBatch})(BatchList)