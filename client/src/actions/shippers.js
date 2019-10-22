import { createShipper } from '../services/api'
import { toast } from 'react-toastify'

export const RECEIVE_SHIPPERS = 'RECEIVE_SHIPPERS'
export const ADD_SHIPPER = 'ADD_SHIPPER'

export function receiveShippers (shippers) {
  return {
    type: RECEIVE_SHIPPERS,
    payload: {
      shippers,
    }
  }
}

function addShipper (shipper) {
  return {
    type: ADD_SHIPPER,
    payload: {
      shipper
    }
  }
}

// Thunks

export function handleCreateShipper (shipperObj, history, setFormikSubmitting = null) {
  return (dispatch) => {
    console.log(shipperObj)
    return createShipper(shipperObj)
      .then(shipper => {
        console.log('Successfully created shipper.')
        // Add the new one to state
        dispatch(addShipper(shipper))
        // Pop a toastie
        toast.success('Shipper created.', { position: 'top-center'})
        // Redirect back to shippers list
        history.push('/app/shippers')
      })
      .catch(error => {
        console.log('Error creating shipper: ', error.message)
        // Pop a toastie
        toast.error('Could not create shipper. Please try again.', { position: 'top-center'})
        // Reset Form
        if (setFormikSubmitting) setFormikSubmitting(false)
      })
  }
}