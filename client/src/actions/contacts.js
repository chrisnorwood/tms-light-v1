import { createContact, deleteContact, updateContact } from '../services/api'
import { toast } from 'react-toastify'

export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'

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

function removeContact (contactId) {
  return {
    type: REMOVE_CONTACT,
    payload: {
      contactId
    }
  }
}

function updateStoreContact (contact) {
  return {
    type: UPDATE_CONTACT,
    payload: {
      contact,
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
        console.log('Error creating contact: ', error.message)
        // Pop a toastie
        toast.error('Could not create contact. Please try again.', { position: 'top-center'})
        // Reset Form
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}

export function handleDeleteContact (contactId, history) {
  return (dispatch) => {
    return deleteContact(contactId)
      .then(success => {
        // Remove the contact from state
        dispatch(removeContact(contactId))
        // Pop a toastie
        toast.success('Contact deleted.', { position: 'top-center'})
        // Redirect back to contacts list
        history.push('/app/contacts')
      })
      .catch(error => {
        console.log('Error deleting contact: ', error.message)
      })
  }
}

export function handleUpdateContact (contactId, contactObj, history, setFormikSubmitting = null) {
  return (dispatch) => {
    return updateContact(contactId, contactObj)
      .then(contact => {
        // Update the contact in state
        dispatch(updateStoreContact(contact))
        // Pop a toastie
        toast.success('Contact updated.', { position: 'top-center'})
        // Redirect back to contacts list
        history.push('/app/contacts')
      })
      .catch(error => {
        console.log('Error updating contact: ', error.message)
        // Pop a toastie
        toast.error('Could not update contact. Please try again.', { position: 'top-center'})
        // Reset Form
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}