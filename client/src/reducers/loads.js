import { RECEIVE_LOADS, ADD_LOAD } from '../actions/loads'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_LOADS :
      return {
        ...state,
        ...action.payload.loads
      }
    case ADD_LOAD :
      return {
        ...state,
        [action.payload.load.id]: action.payload.load,
      }
    default :
      return state
  }
}