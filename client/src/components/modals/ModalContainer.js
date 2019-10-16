import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ModalContainer extends Component {
  componentDidMount() {
    console.log('ModalContainer did mount.')
  }
  
  render() {
    const { match } = this.props

    return (
      <div className='modal'>
        <div className='modal-content'>
          <Link to={`${match.path}`}>
            <span className='close'>&times;</span>
          </Link>
          {this.props.children}
        </div>
      </div>
    )
  }
} 

ModalContainer.propTypes = {
  match: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default ModalContainer