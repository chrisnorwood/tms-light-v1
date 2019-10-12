import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route path='/' exact render={() => (
            <Redirect to='/login' />
          )}/>
          <Route path='/login' component={LoginPage} />
          <Route path='/dash' component={Dashboard} />
        </Router>
        <ToastContainer autoClose={3000} />
      </Fragment>
    )
  }
}

export default App;
