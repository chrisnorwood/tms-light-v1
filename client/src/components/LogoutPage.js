import { useEffect } from 'react'
import { connect } from 'react-redux'
import { handleLogout } from '../actions/auth'

const LogoutPage = ({ dispatch, history }) => {
  useEffect(() => {
    dispatch(handleLogout())
    history.push('/login')
  }, [dispatch, history])
  
  return null
}

export default connect()(LogoutPage)