import { createContact } from '../services/api'
import { toast } from 'react-toastify'

export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT'

export function receiveContacts (contacts) {
  return {
    type: RECEIVE_CONTACTS,
    payload: {
      contacts,
    }
  }
}

function addContact (contact) {
  return {
    type: ADD_CONTACT,
    payload: {
      contact
    }
  }
}

// Thunks

export function handleCreateContact (contactObj, history, setFormikSubmitting = null) {
  return (dispatch) => {
    console.log(contactObj)
    return createContact(contactObj)
      .then(contact => {
        console.log('Successfully created contact.')
        // Add the new one to state
        dispatch(addContact(contact))
        // Pop a toastie
        toast.success('Contact created.', { position: 'top-center'})
        // Redirect back to contacts list
        history.push('/app/contacts')
      })
      .catch(error => {
        console.log('Error creating contact', error.message)
        // Pop a toastie
        toast.error('Could not create contact. Please try again.', { position: 'top-center'})
        // Reset Form
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}