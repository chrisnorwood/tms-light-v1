export const RECEIVE_CARRIERS = 'RECEIVE_CARRIERS'

export function receiveCarriers (carriers) {
  return {
    type: RECEIVE_CARRIERS,
    payload: {
      carriers,
    }
  }
}