import { removeFromObjectByKey } from '../utils/storeHelpers'
import { RECEIVE_SHIPPERS, ADD_SHIPPER, REMOVE_SHIPPER, UPDATE_SHIPPER } from '../actions/shippers'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SHIPPERS :
      return {
        ...state,
        ...action.payload.shippers
      }
    case ADD_SHIPPER :
      return {
        ...state,
        [action.payload.shipper.id]: action.payload.shipper,
      }
    case REMOVE_SHIPPER :
      return removeFromObjectByKey(state, action.payload.shipperId)
    case UPDATE_SHIPPER :
      return {
        ...state,
        [action.payload.shipper.id]: action.payload.shipper,
      }
    default :
      return state
  }
}