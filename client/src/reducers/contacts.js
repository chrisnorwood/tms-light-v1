import { RECEIVE_CONTACTS } from '../actions/contacts'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTACTS :
      return {
        ...state,
        ...action.payload.contacts
      }
    default :
      return state
  }
}