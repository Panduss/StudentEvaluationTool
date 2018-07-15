import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import BatchList from './components/batches/BatchList'
import BatchDetail from './components/batches/BatchDetail'
import showOneStudent from './components/students/Student'
import LogoutPage from './components/logout/LogoutPage'
import TopBar from './components/layout/TopBar'
import NewBatchPage from './components/batches/addBatchPage'
import './App.css';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './theme.js';


class App extends Component {
  render() {
    return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/batches" component={BatchList} />
              <Route exact path="/batch/new" component={NewBatchPage} />
              <Route exact path="/batches/:batchId" component={BatchDetail} />
              <Route exact path="/batches/:batchId/students/:studentId" component={showOneStudent} />
              {/* <Route exact path="/batches/:batchId/students" component={NewStudentPage} /> */}
              <Route exact path="/" render={ () => <Redirect to="/login" /> } />
            </main>
            </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
