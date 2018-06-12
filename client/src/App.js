import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import BatchList from './components/batches/BatchList'
import BatchDetail from './components/batches/BatchDetail'
import showOneStudent from './components/students/Student'
import LogoutPage from './components/logout/LogoutPage'
import TopBar from './components/layout/TopBar'
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <nav>
          <TopBar />
        </nav>
        <main style={{marginTop:75}}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/batches" component={BatchList} />
            <Route exact path="/batches/:id" component={BatchDetail} />
            <Route exact path="/students/:id" component={showOneStudent} />
            <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          </main>
          </div>
      </Router>
    );
  }
}

export default App;
