import { removeFromObjectByKey } from '../utils/storeHelpers'
import { RECEIVE_LOADS, ADD_LOAD, REMOVE_LOAD, UPDATE_LOAD } from '../actions/loads'

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
    case REMOVE_LOAD :
      return removeFromObjectByKey(state, action.payload.loadId)
    case UPDATE_LOAD :
      return {
        ...state,
        [action.payload.load.id]: action.payload.load,
      }
    default :
      return state
  }
}