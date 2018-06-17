import React, {PureComponent} from 'react'
import {getAllStudent} from '../../actions/student'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

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
        const getEvals = randStud.filter(student => student.lastEvaluation !== "white")

        // check if there are reds
        const getReds = getEvals.filter(student => student.lastEvaluation === "red")
        //if there are no reds, every question that would go to reds, goes to yellows
        const noReds = getEvals.filter(student => student.lastEvaluation === "yellow")

        const getYellows = getEvals.filter(student => student.lastEvaluation === "yellow")
        // if there are no yellows, every question goes to reds
        const noYellows = getEvals.filter(student => student.lastEvaluation === "red")

        const getGreens = getEvals.filter(student => student.lastEvaluation === "green")
        // if there are no greens, every question goes to yellow + red
        const noGreens = getEvals.filter(student => student.lastEvaluation !== "green")

        const getRedYellow = getEvals.filter(student => student.lastEvaluation !== "green" )
        // no red or yellow => questions for greens!
        const noRedYellow = getReds.push(getYellows)
        //getEvals.filter(student => student.lastEvaluation === "green")

        const getRedGreen = getEvals.filter(student => student.lastEvaluation !== "yellow")

        const getYellowGreen = getReds.push(getGreens)
        //getEvals.filter(student => student.lastEvaluation !== "red")

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
        // console.log(redNum, "redNum")
        // console.log(yellowNum, "yellowNum")
        // console.log(greenNum, "greenNum")
        // console.log(secondWall, "secondWall")

        // console.log(redNum+yellowNum+greenNum, "meow")

        if (randNumb <= redNum) {
            stud = randStud.filter(student => student.lastEvaluation === "red") 
        }
        if (randNumb <= secondWall && randNumb > redNum) {
            stud = randStud.filter(student => student.lastEvaluation === "yellow")
        }
        if (randNumb <= greenNum && randNumb > secondWall) {
            stud = randStud.filter(student => student.lastEvaluation === "green")
        }

        ///// GETTING A RANDOM STUDENT BASED ON THE PREVIOUSLY GOT DATA 

        const chooseStud = stud[Math.floor(Math.random() * stud.length)]
        console.log(chooseStud, "student")

        if ( chooseStud ) {
            randomStudent = chooseStud
            console.log("i ran 1")
            window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).toUpperCase()} evaluation.`)
        }

        if ( !chooseStud && getReds.length === 0 && getYellows.length <= 3 ) {
             randomStudent = getYellowGreen[Math.floor(Math.random() * getYellowGreen.length)]
             console.log("i ran 2")
             window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).toUpperCase()} evaluation.`)
        }

        if ( !chooseStud && getReds.length === 0 && getYellows.length > 3 ) {
             randomStudent = noReds[Math.floor(Math.random() * noReds.length)]
             console.log("i ran 3")
             window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).toUpperCase()} evaluation.`)
        }

        if ( !chooseStud && getYellows.length === 0 && getReds.length <= 3) {
            randomStudent = getRedGreen[Math.floor(Math.random() * getRedGreen.length)]
            console.log("i ran 4")
            window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).toUpperCase()} evaluation.`)
        }

        if ( !chooseStud && getYellows.length === 0 && getReds.length > 3) {
            randomStudent = noYellows[Math.floor(Math.random() * noYellows.length)]
            console.log("i ran 4")
            window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).toUpperCase()} evaluation.`)
        }

        if ( !chooseStud && getGreens.lenght === 0 ) {
            randomStudent = noGreens[Math.floor(Math.random() * noGreens.length)]
            console.log("i ran 5")
            window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).toUpperCase()} evaluation.`)
        }

        if ( !chooseStud && getRedYellow.length === 0 ) {
            randomStudent = noRedYellow[Math.floor(Math.random() * noRedYellow.length)]
            console.log("i ran 6")
            window.alert(`You should ask: ${randomStudent.firstName} ${randomStudent.lastName}, with ${(randomStudent.lastEvaluation).toUpperCase()} evaluation.`)
        }
    }

    
    render() {
        return ( 
        <div>   
            <div>
                <button className="batchDetailButton" onClick={this.selectStudent}>Ask a question!</button>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.randStud, "heelooo")
    return {
    authenticated: state.currentUser !== null,
    randStud: state.students,
    }
  }

  export default connect(mapStateToProps, {getAllStudent})(GetRandom)




//   const redNum = Math.round(classSize * 0.45)
//   const yellowNum = Math.round(classSize * 0.35)
//   const greenNum = Math.round(classSize * 0.20)