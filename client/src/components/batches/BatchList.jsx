import React, {PureComponent} from 'react'
import {showBatches, showBatch, newBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import NewBatchPage from './addBatchPage'
import './batch.css'

class BatchList extends PureComponent {


componentWillMount() {
        if (this.props.authenticated) {
        this.props.showBatches()
    }
}

showBatch(batchId) {
    this.props.showBatch(batchId)
}

newBatch() {
    this.props.addBatch()
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

const mapStateToProps = state => {
    console.log(state.batches, "batches")
    return {
    authenticated: state.currentUser !== null,
    batches: state.batches 
    // === null ? null : Object.values(state.batches).sort((a, b) => a.id - b.id)
    }
}

export default connect(mapStateToProps, {showBatches, showBatch, newBatch})(BatchList)