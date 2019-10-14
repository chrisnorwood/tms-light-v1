import { RECEIVE_LOADS } from '../actions/loads'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_LOADS :
      return {
        ...state,
        ...action.payload.loads
      }
    default :
      return state
  }
}