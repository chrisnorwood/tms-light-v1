import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { loginUser, getCurrentUser, signupUser } from '../services/api'
import { handleGetInitialData } from './shared'
import { toast } from 'react-toastify'

export const SET_AUTHED_USER = 'SET_AUTHED_USER' 
export const SET_TOKEN = 'SET_TOKEN'
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
export const SET_RE_AUTH = 'SET_RE_AUTH'

function setAuthedUser (user) {
  return {
    type: SET_AUTHED_USER,
    payload: {
      user,
    },
  }
}

function setToken (token) {
  return {
    type: SET_TOKEN,
    payload: {
      token,
    }
  }
}

function setAuthError (error) {
  return {
    type: SET_AUTH_ERROR,
    payload: {
      error,
    }
  }
}

// Thunks

export function handleReAuth (token) {
  return (dispatch) => {
    if (localStorage.getItem('token')) {
      return getCurrentUser(token)
      .then(res => res.json())
      .then(userObject => {
        console.log('I found a user by token', userObject)
        dispatch(setAuthedUser(userObject.user))
        dispatch(setToken(token))
        // Get Initial Data upon 'resigning' in
        dispatch(handleGetInitialData())
      })
      .catch(error => {
        console.log('Error while fetching current user from token.')
        // Signs user out if their token is invalid upon application mount
        dispatch(handleLogout())
      })
    } else {
      dispatch(handleLogout())
    }

  }
}

// does this work correctly?
// It certainly appears so, though there may be more edge cases where needed
export function handleLogout () {
  return (dispatch) => {
    localStorage.clear()
    dispatch(setToken(null))
    dispatch(setAuthedUser(null))
    console.log('Logout successful.')
  }
}

export function handleUserLogin (credentials, history, setFormikSubmitting = null) {
  return (dispatch) => {
    dispatch(setAuthError(null))
    dispatch(showLoading())
    return loginUser(credentials)
      .then(authObject => {
        const { auth_token: token, user } = authObject
        console.log('Login Success')
        // Set Token in Local Storage
        localStorage.setItem('token', token);
        // Set authedUser and token in store
        dispatch(setAuthedUser(user))
        dispatch(setToken(token))
        // Get all initial data necessary for app
        dispatch(handleGetInitialData())
        dispatch(hideLoading())
        // Redirect to Dashboard
        history.push('/app')
      })
      .catch(error => {
        dispatch(hideLoading())
        
        console.log('Login failed')
        // Pop a Toastie
        toast.error('Invalid email or password.', { position: 'top-center'})
        // Set error in store
        dispatch(setAuthError('Invalid email or password.'))
        // If Formik Form passed in callback, then reset our form upon error
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}

export function handleUserSignup (values, history, setFormikSubmitting = null) {
  return (dispatch) => {
    const { name, email, password, confirmation } = values
    const userObject = {
      user: {
        name,
        email,
        password,
        password_confirmation: confirmation,
      }
    }

    signupUser(userObject)
      .then(signupResponse => {
        console.log('Signup sucess')
        // Set Token in Local Storage
        localStorage.setItem('token', signupResponse.auth_token);
        // Set authedUser and token in store
        dispatch(setAuthedUser(signupResponse.user))
        dispatch(setToken(signupResponse.auth_token))
        // Pop a Toastie
        toast.success(signupResponse.message, { position: 'top-center'})
        // Get all initial data necessary for app
        dispatch(handleGetInitialData())
        // Redirect to Dashboard
        history.push('/app')
      })
      .catch(error => {
        console.log('Signup failed', error)
        // This is hacky, and should actually log the error but I can't figure out how to read the message
        toast.error('Email has already been taken.', { position: 'top-center'})
        // If Formik Form passed in callback, then reset our form upon error
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}