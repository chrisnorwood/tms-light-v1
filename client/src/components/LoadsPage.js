import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoadsPage extends Component {
  render() {
    return (
      <div>
        <h1 className='text-3xl border-b-2 border-grey-darkest'>Loads</h1>
      </div>
      
    )
  }
}

export default connect()(LoadsPage)