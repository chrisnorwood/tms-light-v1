import { RECEIVE_CARRIERS, ADD_CARRIER } from '../actions/carriers'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CARRIERS :
      return {
        ...state,
        ...action.payload.carriers
      }
    case ADD_CARRIER :
      return {
        ...state,
        [action.payload.carrier.id]: action.payload.carrier,
      }
    default :
      return state
  }
}