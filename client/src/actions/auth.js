import { loginUser } from '../services/api'

export const SET_AUTHED_USER = 'SET_AUTHED_USER' 
export const SET_TOKEN = 'SET_TOKEN'
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR'

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
    payload: error,
  }
}

// Thunks

export function handleUserLogin (credentials) {
  return (dispatch) => {
    dispatch(setAuthError(null))
    
    loginUser(credentials)
      .then(res => res.json())
      .then(authObject => {
        const { auth_token: token, user } = authObject
        
        console.log('Login Success')
        dispatch(setAuthedUser(user))
        dispatch(setToken(token))
      })
      .catch(error => {
        console.log('Login failed')
        dispatch(setAuthError('Invalid email or password.'))
      })
  }
}