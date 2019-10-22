import { createCarrier, deleteCarrier } from '../services/api'
import { toast } from 'react-toastify'

export const RECEIVE_CARRIERS = 'RECEIVE_CARRIERS'
export const ADD_CARRIER = 'ADD_CARRIER'
export const REMOVE_CARRIER = 'REMOVE_CARRIER'

export function receiveCarriers (carriers) {
  return {
    type: RECEIVE_CARRIERS,
    payload: {
      carriers,
    }
  }
}

function addCarrier (carrier) {
  return {
    type: ADD_CARRIER,
    payload: {
      carrier
    }
  }
}

function removeCarrier (carrierId) {
  return {
    type: REMOVE_CARRIER,
    payload: {
      carrierId
    }
  }
}

// Thunks

export function handleCreateCarrier (carrierObj, history, setFormikSubmitting = null) {
  return (dispatch) => {
    console.log(carrierObj)
    return createCarrier(carrierObj)
      .then(carrier => {
        console.log('Successfully created carrier.')
        // Add the new one to state
        dispatch(addCarrier(carrier))
        // Pop a toastie
        toast.success('Carrier created.', { position: 'top-center'})
        // Redirect back to carriers list
        history.push('/app/carriers')
      })
      .catch(error => {
        console.log('Error creating carrier: ', error.message)
        // Pop a toastie
        toast.error('Could not create carrier. Please try again.', { position: 'top-center'})
        // Reset Form
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}

export function handleDeleteCarrier (carrierId, history) {
  return (dispatch) => {
    return deleteCarrier(carrierId)
      .then(success => {
        // Remove the carrier from state
        dispatch(removeCarrier(carrierId))
        // Pop a toastie
        toast.success('Carrier deleted.', { position: 'top-center'})
        // Redirect back to contacts list
        history.push('/app/carriers')
      })
      .catch(error => {
        console.log('Error deleting carrier: ', error.message)
      })
  }
}