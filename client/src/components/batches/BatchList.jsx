import React, {PureComponent} from 'react'
import {showBatches, showBatch} from '../../actions/batches'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

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
    <Paper>
    <Card key={batch.id} className="game-card">
        <CardContent>
            <Link
                className="link"
                to={`/batches/${batch.id}`}
                onClick={() => this.showBatch(batch.id)}
                >
                <Typography variant="headline" component="h2">
                    Batch #{batch.batchNumber}
                </Typography>
            </Link>
            <Typography color="textSecondary">
                Date: {batch.startDate} - {batch.endDate}
            </Typography>
        </CardContent>
    </Card>
    </Paper>)
  }

  render() {
    const {batches, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
        )
        

    if (batches === null) return null

    return (
      <div>
        {batches.map(batch => this.renderBatch(batch))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    batches: state.batches
  })

export default connect(mapStateToProps, {showBatches, showBatch})(BatchList)