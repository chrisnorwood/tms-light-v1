import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ModalContainer from '../ModalContainer'

const ViewCarrier = ({ carrier, primaryContact, closePath }) => {
  if (!carrier) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid carrier.</div></ModalContainer>

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Carrier Details
      </div>
      <div className='m-4'>
        <ul className='labeled-list'>
          <li>
            <label>Company Name</label>
            <div>{carrier.company_name}</div>
          </li>
          <li>
            <label>Primary Contact</label>
            <div>
              { primaryContact
                ? primaryContact.name
                : <span className='italic'>None</span>}
            </div>
          </li>
          <li>
            <label>Notes</label>
            <div>{carrier.notes}</div>
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

ViewCarrier.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  carrier: PropTypes.object,
  primaryContact: PropTypes.object,
}

function mapStateToProps (state, ownProps) {
  const carrierId = ownProps.match.params.carrierId
  const carrier = state.carriers[carrierId]
  let primaryContact = {}

  if (carrier) {
    const primaryContactId = carrier.primary_contact_id
    primaryContact = state.contacts[primaryContactId]
  }

  return {
    carrier,
    primaryContact,
  }
}

export default connect(mapStateToProps)(ViewCarrier)