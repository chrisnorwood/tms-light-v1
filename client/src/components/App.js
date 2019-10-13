import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './hoc/PrivateRoute'
import PublicRoute from './hoc/PublicRoute'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <PublicRoute path='/login' restricted={true} component={LoginPage} />
          <PrivateRoute path='/dash' component={Dashboard} />
        </Router>
        <ToastContainer autoClose={3000} />
      </Fragment>
    )
  }
}

export default App;
