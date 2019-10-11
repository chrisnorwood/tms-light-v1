import ky from 'ky'

export const baseUrl = '/api/v1'
export const loginUrl = `${baseUrl}/auth/login`
export const loadsUrl = `${baseUrl}/loads`

export const loginUser = async (credentials) => {
  const result = await ky.post(loginUrl, { json: credentials })
  
  return result
}
// export const getLoads = async () => {
//   Commented Out Until Auth Complete
//   Consider switch from axios to Ky
//   const result = await axios.get(loadsUrl)
//     .then(({ data }) => data)

//   return result
// }