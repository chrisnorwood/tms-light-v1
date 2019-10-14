import ky from 'ky'

export const baseUrl = '/api/v1'
export const loginUrl = `${baseUrl}/auth/login`
export const signupUrl = `${baseUrl}/signup`

// Protected
let storedToken = localStorage.getItem('token')

export const profileUrl = `${baseUrl}/current_user`
export const loadsUrl = `${baseUrl}/loads`
export const contactsUrl = `${baseUrl}/contacts`
export const shippersUrl = `${baseUrl}/shippers`
export const carriersUrl = `${baseUrl}/carriers`

// Auth/User Calls

export const loginUser = async (credentials) => {
  const result = await ky.post(loginUrl, { json: credentials })
  
  return result
}

export const getCurrentUser = async (token) => {
  const result = await ky.get(profileUrl, {headers: { authorization: `Bearer ${token}`}})

  return result
}

export const signupUser = async (userObject) => {
  // Takes in user in appropriate format: { user: { name, email, password, password_confirmation }}
  const result = await ky.post(signupUrl, { json: userObject })
  
  return result
}

// Get All Initial Data
// (this function returns promise with actual data in it)
// in format of { loads: [], contacts: [] }
export const getInitialData = (token) => {
  return Promise.all([
    getLoads(token),
    getContacts(token),
    getShippers(token),
    getCarriers(token),
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
export const getLoads = async (token = storedToken) => {
  const result = await ky.get(loadsUrl, { headers: { authorization: `Bearer ${token}`}})

  return result
}

// Contacts
export const getContacts = async (token = storedToken) => {
  const result = await ky.get(contactsUrl, { headers: { authorization: `Bearer ${token}`}})

  return result
}

// Shippers

export const getShippers = async (token = storedToken) => {
  const result = await ky.get(shippersUrl, { headers: { authorization: `Bearer ${token}`}})

  return result
}

// Carriers
export const getCarriers = async (token = storedToken) => {
  const result = await ky.get(carriersUrl, { headers: { authorization: `Bearer ${token}`}})

  return result
}