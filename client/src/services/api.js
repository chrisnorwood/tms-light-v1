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
    loads,
    contacts,
    shippers,
    carriers,
  }))
}

// Loads
// (these functions return promises)
export const getLoads = async () => {
  const result = await ky.get(loadsUrl, createHeaders())

  return result
}

// Contacts
export const getContacts = async () => {
  const result = await ky.get(contactsUrl, createHeaders())

  return result
}

// Shippers

export const getShippers = async () => {
  const result = await ky.get(shippersUrl, createHeaders())

  return result
}

// Carriers
export const getCarriers = async () => {
  const result = await ky.get(carriersUrl, createHeaders())

  return result
}