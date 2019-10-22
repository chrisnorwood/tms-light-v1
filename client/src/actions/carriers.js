import { createCarrier } from '../services/api'
import { toast } from 'react-toastify'

export const RECEIVE_CARRIERS = 'RECEIVE_CARRIERS'
export const ADD_CARRIER = 'ADD_CARRIER'

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