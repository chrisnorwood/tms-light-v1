export const RECEIVE_LOADS = 'RECEIVE_LOADS'

export function receiveLoads (loads) {
  return {
    type: RECEIVE_LOADS,
    payload: {
      loads,
    }
  }
}