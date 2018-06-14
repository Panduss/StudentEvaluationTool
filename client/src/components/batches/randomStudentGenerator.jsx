import React, {PureComponent} from 'react'
import {getAllStudent} from '../../actions/student'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

class GetRandom extends PureComponent {

    componentWillMount() {
        this.props.getAllStudent()
        if (this.props.authenticated) {
        if (this.props.randStud === null) this.props.getAllStudent()
        }
    }

    getAllStudent() {
        this.props.getAllStudent()
    }
        
    selectStudent = () => {
        const { randStud, chosenStudent, student, authenticated } = this.props

        if (!authenticated) return (
            <Redirect to="/login" />
        )

        let randomStudent;
        let stud

        const classSize = randStud.length
        console.log(classSize, "size")
        const randNumb = Math.floor(Math.random() * classSize)
        console.log(randNumb, "randNumb")
        const redLength = classSize * 0.45
        const yellowLength = classSize * 0.35
        const greenLength = classSize * 0.20

        const redNum = parseInt(redLength.toFixed())
        const yellowNum = parseInt(yellowLength.toFixed())
        const greenNum = parseInt(greenLength.toFixed())
        console.log(redNum, "redNum")
        console.log(yellowNum, "yellowNum")
        console.log(greenNum, "greenNum")

        console.log(redNum+yellowNum+greenNum, "meow")

        if (randNumb <= redNum) {
            stud = randStud.map(student => student.lastEvaluation == "red")
        }
        if (randNumb > redNum && randNumb <= (parseInt((redNum+yellowNum).toFixed()))) {
            stud = randStud.filter(student => student.lastEvaluation == "yellow")
        }
        if (randNumb > yellowNum && randNumb <= classSize) {
            stud = randStud.filter(student => student.lastEvaluation == "green")
        }


        // const redS = this.randStud.filter(student => student.lastEvaluation)
        // stud = randStud.filter(student => student.id === randNumb)
        console.log(stud, "student")

        if (!student) return randomStudent = chosenStudent
        if (student) return randomStudent = student

        return(
        <div>You should ask:${randomStudent.firstName}, with ${randomStudent.lastEvaluation} evaluation.</div>
        )
    }
    
    render() {
        return (    
        <div>
            <button onClick={this.selectStudent}>RandRand</button>
        </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.randStud, "heelooo")
    return {
    authenticated: state.currentUser !== null,
    randStud: state.randStud,
    chosenStudent: {   id: 2,
        firstName: "Dean",
        lastName: "Winchester",
        profilePic: "https://cdn.costumewall.com/wp-content/uploads/2017/01/dean-winchester.jpg",
        lastEvaluation: "green"
    }
    }
  }

  export default connect(mapStateToProps, {getAllStudent})(GetRandom)