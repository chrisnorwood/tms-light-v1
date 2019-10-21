import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ModalContainer from '../ModalContainer'

const EditContact = ({ contacts, closePath, dispatch, history }) => {
  // if (!contact) return <div className='text-center text-xl'>That is not a valid contact.</div>
  // if (!parent) return <div className='text-center text-xl'>Loading</div>

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Edit Contact
      </div>
      <div className='m-4'>
        pee pee weiners
      </div>
      <div className='flex'>
        <Link
          to={closePath}
          className='bg-primary text-center w-full p-4 mt-3 mx-2 text-sm text-white uppercase font-bold tracking-wider hover:bg-primary-dark disabled:opacity-75 disabled:cursor-not-allowed'
        >
          Close
        </Link>
      </div>
    </ModalContainer>
  )
}

EditContact.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps (state, ownProps) {
  return {
    contacts: state.contacts,
    carriers: state.carriers,
    shippers: state.shippers,
  }
}

export default connect(mapStateToProps)(EditContact)