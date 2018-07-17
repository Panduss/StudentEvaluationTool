import React, {PureComponent} from 'react'
import {showBatches, showBatch, newBatch, deleteBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import NewBatchPage from './addBatchPage'
import { Grid, CardContent } from 'material-ui';
import { Button, Typography, CardActions, Card } from '@material-ui/core';
import 'typeface-bitter'

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

render = () => {
    if (!this.props.authenticated) {
        return <Redirect to="/login" />
      }
      if (
        !this.props.batches
      ) {
        return <div>Create a batch!</div>
      }
  
    //   const media = {
    //     paddingTop: '27%',
    //     width:"250px"
    //   }
  
      const {batches} = this.props
    return (
    <div>
        <NewBatchPage />
        <Grid
            className="main"
            style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridAutoRows: 'minMax(50px, auto)',
            gridGap: '1rem',
            padding: '1rem',
            margin: 'auto'
        }}>
            {batches.map(batch => (
                <Card key={batch.id}>
                    <CardContent>
                        <Typography variant="headline">
                            Batch #{batch.batchNumber}
                        </Typography>
                        <Typography variant="subheading">
                            {batch.startDate} - {batch.endDate}
                        </Typography>
                        
                        <CardActions
                            style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Link 
                                to={`/batches/${batch.id}`}
                                style={{ textDecoration: 'none'}}>
                                <Button variant="contained" color="secondary" onClick={() => this.showBatch(batch.id)}>Show Batch</Button>
                            </Link>
                            <Button variant="contained" color="primary" onClick={() => this.deleteBatch(batch.id)}>Delete Batch</Button>
                        </CardActions>
                    </CardContent>
                </Card>
           ))}
        </Grid>
    </div>
)}
}

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    batches: state.batches === null ?
    null : Object.values(state.batches).sort((a, b) => b.name - a.name)
})

export default connect(mapStateToProps, {showBatches, showBatch, newBatch, deleteBatch})(BatchList)