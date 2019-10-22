import { RECEIVE_SHIPPERS, ADD_SHIPPER } from '../actions/shippers'

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
    default :
      return state
  }
}