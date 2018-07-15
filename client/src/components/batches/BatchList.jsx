import React, {PureComponent} from 'react'
import {showBatches, showBatch, newBatch, deleteBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import NewBatchPage from './addBatchPage'
import { Grid, CardContent } from 'material-ui';
import { Paper, Button, Typography, CardActions, Card } from '@material-ui/core';

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
    <Grid key={batch.id}>
        <Card>
            <CardContent>
                <Typography>
                    Batch #{batch.batchNumber}
                </Typography>
                <Typography>
                    Date: {batch.startDate} - {batch.endDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/batches/${batch.id}`}>
                    <Button onClick={() => this.showBatch(batch.id)}>Show Batch</Button>
                </Link>
                <Button onClick={() => this.deleteBatch(batch.id)}>Delete Batch</Button>
            </CardActions>
        </Card>
    </Grid>
)}

  render() {
    const {batches, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
        )
        

    if (batches === null) return null

    return (
        <Paper className="outer-paper">
            <h2>Create new batch</h2>
            <NewBatchPage />
            <h2>All batches</h2>
            <Grid container spacing={24}>
                {batches.map(batch => this.renderBatch(batch))}
            </Grid>
        </Paper>
    )
  }
}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    batches: state.batches === null ?
    null : Object.values(state.batches).sort((a, b) => b.name - a.name)
})

export default connect(mapStateToProps, {showBatches, showBatch, newBatch, deleteBatch})(BatchList)