import { loginUser, getCurrentUser } from '../services/api'
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
    getCurrentUser(token)
    .then(res => res.json())
    .then(userObject => {
      console.log('I found an existing session/token', userObject)
      dispatch(setAuthedUser(userObject.user))
      dispatch(setToken(token))
    })
    .catch(error => console.log('Error while fetching current user from token.'))
  }
}

// does this work correctly?
export function handleSignOut () {
  return (dispatch) => {
    localStorage.clear()
    dispatch(setToken(null))
    dispatch(setAuthedUser(null))
  }
}

export function handleUserLogin (credentials, history) {
  return (dispatch) => {
    dispatch(setAuthError(null))

    loginUser(credentials)
      .then(res => res.json())
      .then(authObject => {
        const { auth_token: token, user } = authObject
        console.log('Login Success')
        // Set Token in Local Storage
        localStorage.setItem('token', token);
        // Set authedUser and token in store
        dispatch(setAuthedUser(user))
        dispatch(setToken(token))
        // Redirect to Dashboard
        history.push('/dash')
      })
      .catch(error => {
        console.log('Login failed')
        // Pop a Toastie
        toast.error('Invalid email or password.', { position: 'top-center'})
        // Set error in store
        dispatch(setAuthError('Invalid email or password.'))
      })
  }
}