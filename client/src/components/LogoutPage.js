import { Component } from 'react'
import { connect } from 'react-redux'
import { handleLogout } from '../actions/auth'

class LogoutPage extends Component {
  componentWillMount() {
    this.props.dispatch(handleLogout())
    this.props.history.push('/login')
  }
  
  render() {
    return null
  }
}

export default connect()(LogoutPage)