import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ModalContainer = ({ closePath, children }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <Link to={closePath}>
          <span className='close'>&times;</span>
        </Link>
        {children}
      </div>
    </div>
  )
} 

ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  closePath: PropTypes.string.isRequired,
}

export default ModalContainer