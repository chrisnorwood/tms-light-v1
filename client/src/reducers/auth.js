import { SET_AUTHED_USER, SET_TOKEN, SET_AUTH_ERROR } from '../actions/auth'

const initialState = {
  token: null,
  user: {},
  error: null,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return {
        ...state,
        user: action.payload.user,
      }
    case SET_TOKEN :
      return {
        ...state,
        token: action.payload.token,
      }
    case SET_AUTH_ERROR :
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}