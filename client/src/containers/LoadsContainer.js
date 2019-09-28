import React, { useEffect , useState } from 'react'
import { getLoads } from '../services/tmsApi'

export const LoadsContainer = () => {
  const [loads, setLoads] = useState([])

  useEffect(() => {
    getLoads().then(data => setLoads(data))
  }, [])

  return (
    <pre>{JSON.stringify(loads, null, 2)}</pre>
  )
}