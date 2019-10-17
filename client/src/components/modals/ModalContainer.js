import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ModalContainer extends Component {
  componentDidMount() {
    console.log('ModalContainer did mount.')
  }
  
  render() {
    const { closePath } = this.props

    return (
      <div className='modal'>
        <div className='modal-content'>
          <Link to={closePath}>
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
  closePath: PropTypes.string.isRequired,
}

export default ModalContainer