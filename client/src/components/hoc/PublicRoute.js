import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// This feels hacky, and the check ought to come from state instead
// having trouble with the fact it is async though
function tokenExists() {
  return (localStorage.getItem('token')) ? true : false
}

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise redirect to /login
    <Route {...rest} render={props => (
      tokenExists() && restricted
        ? <Redirect to='/app' />
        : <Component {...props} />
    )}/>
  )
}

function mapStateToProps({ auth }) {
  // if we see the valid auth state here, which would ONLY be set from login or the initial render reauth
  // then we can set an "authorized" prop for our PublicRoute
  return {
    isAuthed: (auth.token !== null) ? true : false
  }
}

export default connect(mapStateToProps)(PublicRoute)