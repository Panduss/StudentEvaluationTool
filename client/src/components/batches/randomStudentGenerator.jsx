import React, {PureComponent} from 'react'
import {getAllStudent} from '../../actions/student'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Button, Typography } from '@material-ui/core';
import swal from 'sweetalert'

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
        const { randStud, authenticated } = this.props

        if (!authenticated) return (
            <Redirect to="/login" />
        )

        let randomStudent;
        let stud

        //// GETTING ALL THE INFO ABOUT THE BATCH AND STUDENTS IN IT & THE RANDOM NUMBER

        //getting all the students that has an evaluation already
        const getEvals = randStud.filter(student => student.lastEvaluation.split('/')[1] !== "white")
        console.log(getEvals, 'all evaluations')

        // check if there are reds
        const getReds = getEvals.filter(student => student.lastEvaluation === "red/#e57373")
        console.log(getReds, 'reds and greens')
        //if there are no reds, every question that would go to reds, goes to yellows
        const noReds = getEvals.filter(student => student.lastEvaluation === "yellow/#fff176")

        const getYellows = getEvals.filter(student => student.lastEvaluation === "yellow/#fff176")
        // if there are no yellows, every question goes to reds
        const noYellows = getEvals.filter(student => student.lastEvaluation === "red")

        const getGreens = getEvals.filter(student => student.lastEvaluation === "green/#81c784")
        // if there are no greens, every question goes to yellow + red
        const noGreens = getEvals.filter(student => student.lastEvaluation !== "green/#81c784")

        const getRedYellow = getEvals.filter(student => student.lastEvaluation !== "green/#81c784" )
        // no red or yellow => questions for greens!
        const noRedYellow = getEvals.filter(student => student.lastEvaluation === "green/#81c784" )
        //getEvals.filter(student => student.lastEvaluation === "green")

        const getRedGreen = getEvals.filter(student => student.lastEvaluation === "red/#e57373" || student.lastEvaluation === "green/#81c784" )
        console.log(getRedGreen, "red and green")

        const getYellowGreen = getEvals.filter(student => student.lastEvaluation === "yellow/#fff176" || student.lastEvaluation === "green/#81c784" )

        // console.log(getReds, "onlyReds here")
        // console.log(getYellows, "onlyYellows here")
        // console.log(getGreens, "onlyGreens here")     
        // console.log(getRedYellow, "onlyRedandYellow here")  
        
        // console.log(noReds, "no Reds here")
        // console.log(noYellows, "no Yellows here")
        // console.log(noGreens, "no Greens here")     
        // console.log(noRedYellow, "no RedandYellow here") 
        
        const classSize = getEvals.length
        console.log(classSize, "size")
        const randNumb = Math.floor(Math.random() * (classSize.toFixed(2)) +1.00)
        console.log(randNumb, "randNumb")


        ////// CALCULATING THE PERCENTAGES

        const redNum = classSize * 0.45
        const yellowNum = classSize * 0.35
        const greenNum = classSize * 0.20
        const secondWall = redNum+yellowNum
        console.log(redNum, "redNum")
        console.log(yellowNum, "yellowNum")
        console.log(greenNum, "greenNum")
        console.log(secondWall, "secondWall")

        console.log(redNum+yellowNum+greenNum, "meow")

        if (randNumb <= redNum) {
            stud = randStud.filter(student => student.lastEvaluation === "red/#e57373") 
        }
        if (randNumb <= secondWall && randNumb > redNum) {
            stud = randStud.filter(student => student.lastEvaluation === "yellow/#fff176")
        }
        if (randNumb <= classSize && randNumb > secondWall) {
            stud = randStud.filter(student => student.lastEvaluation === "green/#81c784")
        }

        ///// GETTING A RANDOM STUDENT BASED ON THE PREVIOUSLY GOT DATA 

        const chooseStud = stud[Math.floor(Math.random() * stud.length)]
        console.log(chooseStud, "student")

        if ( chooseStud ) {
            randomStudent = chooseStud
            console.log("i ran 1")
            //window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`)
        }
        // if choosestud is undefined, no reds in the class and less than 3 yellow student
        // ask anyone
        if ( !chooseStud && getReds.length === 0 && getYellows.length <= 3 ) {
             randomStudent = getYellowGreen[Math.floor(Math.random() * getYellowGreen.length)]
             console.log("i ran 2")
             //window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`)
        }
        // if choosestud is undefined, no reds in the class and more than 3 yellow student
        // ask every red question from a yellow student
        if ( !chooseStud && getReds.length === 0 && getYellows.length > 3 ) {
             randomStudent = noReds[Math.floor(Math.random() * noReds.length)]
             console.log("i ran 3")
             //window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`)
        }
        // if choosestud is undefined, no yellows in the class and less than 3 red,
        // ask anyone
        if ( !chooseStud && getYellows.length === 0 && getReds.length <= 3) {
            randomStudent = getRedGreen[Math.floor(Math.random() * getRedGreen.length)]
            console.log("i ran 4")
            //window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`)
        }
        // if choosestud is undefined, no yellows in the class and more than 3 reds,
        // as evey yellow question from a red.
        if ( !chooseStud && getYellows.length === 0 && getReds.length > 3) {
            randomStudent = noYellows[Math.floor(Math.random() * noYellows.length)]
            console.log("i ran 5")
           // window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`)
        }
        // if chosenstud is undefined, and there are no greens, 
        // as evey green question from a red or yellow student 
        if ( !chooseStud && getGreens.lenght === 0 ) {
            randomStudent = noGreens[Math.floor(Math.random() * noGreens.length)]
            console.log("i ran 6")
            //window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`)
        }
        // if chosenstud is undefined and there are no yellow or red students,
        // ask only greens
        if ( !chooseStud && getRedYellow.length === 0 ) {
            randomStudent = noRedYellow[Math.floor(Math.random() * noRedYellow.length)]
            console.log("i ran 7")
            //window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`)
        }
        swal({
            text: `You should ask: ${(randomStudent.firstName + " " + randomStudent.lastName).toUpperCase()}, with ${(randomStudent.lastEvaluation).split('/')[0].toUpperCase()} evaluation.`,
            button: false,
            timer: 4000,
            icon: `${randomStudent.profilePic}`
          });
    }

    
    render() {
        return ( 
            <div style={{textAlign: 'center'}}>
                <Button 
                variant="contained" 
                color="secondary" 
                onClick={this.selectStudent}
                style={{margin: '1.5rem'}}
                >
                Ask a question!
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    authenticated: state.currentUser !== null,
    randStud: state.students,
    }
  }

  export default connect(mapStateToProps, {getAllStudent})(GetRandom)




//   const redNum = Math.round(classSize * 0.45)
//   const yellowNum = Math.round(classSize * 0.35)
//   const greenNum = Math.round(classSize * 0.20)