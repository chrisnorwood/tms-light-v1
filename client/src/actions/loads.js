import { createLoad } from '../services/api'
import { toast } from 'react-toastify'

export const RECEIVE_LOADS = 'RECEIVE_LOADS'
export const ADD_LOAD = 'ADD_LOAD'

export function receiveLoads (loads) {
  return {
    type: RECEIVE_LOADS,
    payload: {
      loads,
    }
  }
}

function addLoad (load) {
  return {
    type: ADD_LOAD,
    payload: {
      load
    }
  }
}

// Thunks

export function handleCreateLoad (loadObj, history, setFormikSubmitting = null) {
  return (dispatch) => {
    console.log(loadObj)
    return createLoad(loadObj)
      .then(load => {
        console.log('Successfully created load.')
        // Add the new one to state
        dispatch(addLoad(load))
        // Pop a toastie
        toast.success('Load created.', { position: 'top-center'})
        // Redirect back to loads list
        history.push('/app/loads')
      })
      .catch(error => {
        console.log('Error creating load: ', error.message)
        // Pop a toastie
        toast.error('Could not create load. Please try again.', { position: 'top-center'})
        // Reset Form
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}