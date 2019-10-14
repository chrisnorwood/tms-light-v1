// need loads, carriers, shippers, contacts
import { getInitialData } from '../services/api'
import { receiveLoads } from './loads'
import { receiveContacts } from './contacts'
import { receiveShippers } from './shippers'
import { receiveCarriers } from './carriers'

// Thunk

export const handleGetInitialData = (token) => {
  return (dispatch) => {
    return getInitialData(token)
      .then(({ loads, contacts, shippers, carriers }) => {
        dispatch(receiveLoads(loads))
        dispatch(receiveContacts(contacts))
        dispatch(receiveShippers(shippers))
        dispatch(receiveCarriers(carriers))
      })
  }
}