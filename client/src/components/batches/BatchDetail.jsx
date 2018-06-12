import React, {PureComponent} from 'react'
import {showBatch} from '../../actions/batches'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

class BatchDetail extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.students === null) this.props.showBatch()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderStudent = (student) => {
    const { students } = this.props

    return (
    <Card key={student.id} className="game-card">
        <CardContent>
          <Typography variant="headline" component="h2">
              Name:
                  <Link
                      className="link"
                      to={`/students/${student.id}`}
                  >
                  {student.firstName} {student.lastName}
                  </Link>
          </Typography>
          <Typography color="textSecondary">
              Last Evaluation: {student.lastEvaluation}
          </Typography>
        </CardContent>
    </Card>)
  }

  render() {
    const {students, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (students === null) return null

    return (
      <div>
        {students.map(student => this.renderStudent(student))}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  students: state.students
  
})

export default connect(mapStateToProps, {showBatch})(BatchDetail)