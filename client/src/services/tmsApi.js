import axios from 'axios'

export const baseUrl = '/api/v1/'
export const loadsUrl = `${baseUrl}loads.json`

export const getLoads = async () => {
  // Commented Out Until Auth Complete
  // Consider switch from axios to Ky
  // const result = await axios.get(loadsUrl)
  //   .then(({ data }) => data)

  // return result
}