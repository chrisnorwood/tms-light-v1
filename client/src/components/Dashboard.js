import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <h1>DASHBOARD</h1>
    )
  }
}

export default connect()(Dashboard)