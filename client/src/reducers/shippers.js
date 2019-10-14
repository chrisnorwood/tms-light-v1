import { RECEIVE_SHIPPERS } from '../actions/shippers'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SHIPPERS :
      return {
        ...state,
        ...action.payload.shippers
      }
    default :
      return state
  }
}