import { RECEIVE_CARRIERS } from '../actions/carriers'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CARRIERS :
      return {
        ...state,
        ...action.payload.carriers
      }
    default :
      return state
  }
}