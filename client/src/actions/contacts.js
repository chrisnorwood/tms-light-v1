export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'

export function receiveContacts (contacts) {
  return {
    type: RECEIVE_CONTACTS,
    payload: {
      contacts,
    }
  }
}