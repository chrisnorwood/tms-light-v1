import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

// This feels hacky, and the check ought to come from state instead
// having trouble with the fact it is async though
function tokenExists() {
  return (localStorage.getItem('token')) ? true : false
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise redirect to /login
    <Route {...rest} render={props => (
      !tokenExists()
        ? toast.warn('You must be logged in to view that page.', { position: 'top-center'}) && <Redirect to='/login' />
        : <Component {...props} />
    )}/>
  )
}

function mapStateToProps({ auth }) {
  // if we see the valid auth state here, which would ONLY be set from login or the initial render reauth
  // then we can set an "authorized" prop for our PrivateRoute
  return {
    isAuthed: (auth.token !== null) ? true : false
  }
}

export default connect(mapStateToProps)(PrivateRoute)