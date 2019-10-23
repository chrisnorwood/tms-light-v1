import ky from 'ky'

export const baseUrl = '/api/v1'
export const loginUrl = `${baseUrl}/auth/login`
export const signupUrl = `${baseUrl}/signup`

// Protected

export const profileUrl = `${baseUrl}/current_user`
export const loadsUrl = `${baseUrl}/loads`
export const contactsUrl = `${baseUrl}/contacts`
export const shippersUrl = `${baseUrl}/shippers`
export const carriersUrl = `${baseUrl}/carriers`

// Helper Functions
//
// *** Turns array into object of items, keyed by ID
// From medium.com/dailyjs
const arrayToObject = (arr, keyField) =>
  Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})))

// Auth/User Calls

export const loginUser = async (credentials) => {
  const result = await ky.post(loginUrl, { json: credentials }).then(res => res.json())
  
  return result
}

export const getCurrentUser = async (token) => {
  const result = await ky.get(profileUrl, {headers: { authorization: `Bearer ${token}`}})

  return result
}

export const signupUser = async (userObject) => {
  // Takes in user in appropriate format: { user: { name, email, password, password_confirmation }}
  const result = await ky.post(signupUrl, { json: userObject }).then(res => res.json())
  
  return result
}

// Gets Token from Local Storage
const getToken = () => {
  return localStorage.getItem('token')
}

const createHeaders = () => {
  return {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  }
}

// Get All Initial Data
// (this function returns promise with actual data in it)
// in format of { loads: [], contacts: [] }
export const getInitialData = () => {

  return Promise.all([
    getLoads(),
    getContacts(),
    getShippers(),
    getCarriers(),
  ])
  .then(result => Promise.all(result.map(dataType => dataType.json())))
  .then(([ loads, contacts, shippers, carriers ]) => ({
    loads: arrayToObject(loads, 'id'),
    contacts: arrayToObject(contacts, 'id'),
    shippers: arrayToObject(shippers, 'id'),
    carriers: arrayToObject(carriers, 'id'), 
  }))
}

// Loads
// ( most of these functions return promises)
export const getLoads = async () => {
  const result = await ky.get(loadsUrl, createHeaders())

  return result
}

export const createLoad = async (loadObj) => {
  const result = await ky.post(loadsUrl, {...createHeaders(), json: loadObj }).then(res => res.json())

  return result
}

// Contacts
export const getContacts = async () => {
  const result = await ky.get(contactsUrl, createHeaders())

  return result
}

export const createContact = async (contactObj) => {
  const result = await ky.post(contactsUrl, {...createHeaders(), json: contactObj }).then(res => res.json())

  return result
}

export const deleteContact = async (id) => {
    const deleteContactUrl = `${contactsUrl}/${id}`
    const result = await ky.delete(deleteContactUrl, createHeaders())

    // Successful response will be status 204 with no content
    return result
}

export const updateContact = async (id, contactObj) => {
  const updateContactUrl = `${contactsUrl}/${id}`
  const result = await ky.put(updateContactUrl, {...createHeaders(), json: contactObj }).then(res => res.json())

  // Successful response will be status 202 with NEW contact object (similar to createContact response)
  return result
}

// Shippers

export const getShippers = async () => {
  const result = await ky.get(shippersUrl, createHeaders())

  return result
}

export const createShipper = async (shipperObj) => {
  const result = await ky.post(shippersUrl, {...createHeaders(), json: shipperObj }).then(res => res.json())

  return result
}

export const deleteShipper = async (id) => {
  const deleteShipperUrl = `${shippersUrl}/${id}`
  const result = await ky.delete(deleteShipperUrl, createHeaders())

  // Successful response will be status 204 with no content
  return result
}

export const updateShipper = async (id, shipperObj) => {
  const updateShipperUrl = `${shippersUrl}/${id}`
  const result = await ky.put(updateShipperUrl, {...createHeaders(), json: shipperObj }).then(res => res.json())

  // Successful response will be status 202 with updated shipper object (similar to createShipper response)
  return result
}

// Carriers
export const getCarriers = async () => {
  const result = await ky.get(carriersUrl, createHeaders())

  return result
}

export const createCarrier = async (carrierObj) => {
  const result = await ky.post(carriersUrl, {...createHeaders(), json: carrierObj }).then(res => res.json())

  return result
}

export const deleteCarrier = async (id) => {
  const deleteCarrierUrl = `${carriersUrl}/${id}`
  const result = await ky.delete(deleteCarrierUrl, createHeaders())

  // Successful response will be status 204 with no content
  return result
}

export const updateCarrier = async (id, carrierObj) => {
  const updateCarrierUrl = `${carriersUrl}/${id}`
  const result = await ky.put(updateCarrierUrl, {...createHeaders(), json: carrierObj }).then(res => res.json())

  // Successful response will be status 202 with updated carrier object (similar to createCarrier response)
  return result
}