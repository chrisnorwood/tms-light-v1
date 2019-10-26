import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import auth from './auth'
import loads from './loads'
import contacts from './contacts'
import shippers from './shippers'
import carriers from './carriers'

export default combineReducers({
  auth,
  loads,
  contacts,
  shippers,
  carriers,
  loadingBar: loadingBarReducer,
})