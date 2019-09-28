import axios from 'axios'

export const baseUrl = '/api/v1/'
export const loadsUrl = `${baseUrl}loads.json`

export const getLoads = async () => {
  const result = await axios.get(loadsUrl)
    .then(({ data }) => data)

  return result
}