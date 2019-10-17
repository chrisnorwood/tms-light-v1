import { removeByKey } from '../utils/storeHelpers'
import { RECEIVE_CONTACTS, ADD_CONTACT, REMOVE_CONTACT } from '../actions/contacts'

const initialState = {}

export default function loads(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CONTACTS :
      return {
        ...state,
        ...action.payload.contacts
      }
    case ADD_CONTACT :
      return {
        ...state,
        [action.payload.contact.id]: action.payload.contact,
      }
      case REMOVE_CONTACT :
        let stateWithRemovedContact = removeByKey(state, action.payload.contactId)
        return stateWithRemovedContact
    default :
      return state
  }
}