import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './Login'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path='/' exact render={() => (
            <Redirect to='/login' />
          )}/>
          <Route path='/login' component={Login} />
          <Route component={Login} />
        </Fragment>
      </Router>
    )
  }
}

export default App;
