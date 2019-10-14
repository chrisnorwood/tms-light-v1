export const RECEIVE_SHIPPERS = 'RECEIVE_SHIPPERS'

export function receiveShippers (shippers) {
  return {
    type: RECEIVE_SHIPPERS,
    payload: {
      shippers,
    }
  }
}