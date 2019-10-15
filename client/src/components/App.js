import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './hoc/PrivateRoute'
import PublicRoute from './hoc/PublicRoute'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import LogoutPage from './LogoutPage'
import MainContainer from './MainContainer'

class App extends Component {  
  render() {
    return (
      <Fragment>
        <Router>
          <PublicRoute path='/' exact restricted={true} component={LoginPage}/>
          <PublicRoute path='/login' restricted={true} component={LoginPage} />
          <PublicRoute path='/signup' restricted={true} component={SignupPage} />
          <PrivateRoute path='/logout' component={LogoutPage} />
          <PrivateRoute path='/app' component={MainContainer} />
        </Router>
        <ToastContainer autoClose={3000} />
      </Fragment>
    )
  }
}

export default App;
