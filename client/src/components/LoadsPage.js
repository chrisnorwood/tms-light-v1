import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoadsPage extends Component {
  componentDidMount() {
    console.log('LoadsPage did mount.')
  }
  
  render() {
    return (
      <h1 className='text-4xl border-b-2 border-grey-darkest'>Loads</h1>
    )
  }
}

export default connect()(LoadsPage)