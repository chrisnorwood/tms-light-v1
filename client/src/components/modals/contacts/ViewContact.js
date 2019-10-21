import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ModalContainer from '../ModalContainer'

const ViewContact = ({ contact, parent, closePath }) => {
  if (!contact) return <div className='text-center text-xl'>That is not a valid contact.</div>
  if (!parent) return <div className='text-center text-xl'>Loading</div>

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Contact Details
      </div>
      <div className='m-4'>
        <ul className='labeled-list'>
          <li>
            <label>Name</label>
            <div>{contact.name}</div>
          </li>
          <li>
            <label>Type</label>
            <div>{contact.contactable_type}</div>
          </li>
          <li>
            <label>Company</label>
            <div>{parent.company_name}</div>
          </li>
          <li>
            <label>Phone</label>
            <div>{contact.phone}</div>
          </li>
          <li>
            <label>Email</label>
            <div>{contact.email}</div>
          </li>
          <li>
            <label>Notes</label>
            <div>{contact.notes}</div>
          </li>
        </ul>
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

ViewContact.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  contact: PropTypes.object,
  parent: PropTypes.object,
}

function mapStateToProps (state, ownProps) {
  const contactId = ownProps.match.params.contactId
  const contact = state.contacts[contactId]
  let parentObj = {}

  if (contact) {
    const parentType = contact.contactable_type.toLowerCase() + 's' 
    const parentId = contact.contactable_id
    parentObj = state[parentType][parentId]
  }

  return {
    contact,
    parent: parentObj,
  }
}

export default connect(mapStateToProps)(ViewContact)