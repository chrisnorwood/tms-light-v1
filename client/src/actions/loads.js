import { createLoad, deleteLoad, updateLoad } from '../services/api'
import { toast } from 'react-toastify'

export const RECEIVE_LOADS = 'RECEIVE_LOADS'
export const ADD_LOAD = 'ADD_LOAD'
export const REMOVE_LOAD = 'REMOVE_LOAD'
export const UPDATE_LOAD = 'UPDATE_LOAD'

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

function removeLoad (loadId) {
  return {
    type: REMOVE_LOAD,
    payload: {
      loadId
    }
  }
}

function updateStoreLoad (load) {
  return {
    type: UPDATE_LOAD,
    payload: {
      load,
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

export function handleDeleteLoad (loadId, history) {
  return (dispatch) => {
    return deleteLoad(loadId)
      .then(success => {
        // Remove the load from state
        dispatch(removeLoad(loadId))
        // Pop a toastie
        toast.success('Load deleted.', { position: 'top-center'})
        // Redirect back to contacts list
        history.push('/app/loads')
      })
      .catch(error => {
        console.log('Error deleting load: ', error.message)
      })
  }
}

export function handleUpdateLoad (loadId, loadObj, history, setFormikSubmitting = null) {
  return (dispatch) => {
    return updateLoad(loadId, loadObj)
      .then(load => {
        // Update the load in state
        dispatch(updateStoreLoad(load))
        // Pop a toastie
        toast.success('Load updated.', { position: 'top-center'})
        // Redirect back to contacts list
        history.push('/app/loads')
      })
      .catch(error => {
        console.log('Error updating load: ', error.message)
        // Pop a toastie
        toast.error('Could not update load. Please try again.', { position: 'top-center'})
        // Reset Form
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}