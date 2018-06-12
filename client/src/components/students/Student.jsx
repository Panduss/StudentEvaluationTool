import React, {PureComponent} from 'react'
import {showStudent} from '../../actions/student'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

class ShowOneStudent extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.student === null) this.props.showStudent()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderOneStudent = (one) => {
    const { student } = this.props

    return (
    <Card key={one.id} className="game-card">
        <Button className="button">
            {/* <Link
                className="link"
                to={`/students/${one.id}`}
                onClick={() => this.showStudent(student.id)}
                >
                <Typography variant="headline" component="h2">
                    Name: {student.firstName} {student.lastName}
                </Typography>
            </Link> */}
            <CardContent>
            <Typography variant="headline" component="h2">
                    Name: {one.firstName} {one.lastName}
                </Typography>
                <Typography variant="headline" component="h2">
                    Picture: {one.profilePic}
                </Typography>
                <Typography color="textSecondary">
                    Last evaluation: {one.lastEvaluation}
                </Typography>
            </CardContent>
        </Button>
    </Card>)
  }

  render() {
    const {student, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (student === null) return null

    return (
      <div>
        {student.map(one => this.renderOneStudent(one))}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  student: state.student
  
})

export default connect(mapStateToProps, {showStudent})(ShowOneStudent)