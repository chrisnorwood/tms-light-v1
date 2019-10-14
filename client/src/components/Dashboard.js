import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainContainer from './MainContainer'

class Dashboard extends Component {
  render() {
    return (
      <MainContainer>
        <h1 className='text-4xl border-b-2 border-grey-darkest'>Welcome Back</h1>
      </MainContainer>
    )
  }
}

export default connect()(Dashboard)