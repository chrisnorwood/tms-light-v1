import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ModalContainer from '../ModalContainer'

const ViewShipper = ({ shipper, primaryContact, closePath }) => {
  if (!shipper) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>That is not a valid shipper.</div></ModalContainer>
  // if (!parent) return <ModalContainer closePath={closePath}><div className='text-center text-xl'>Loading</div></ModalContainer>

  return (
    <ModalContainer closePath={closePath}>
      <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
        Shipper Details
      </div>
      <div className='m-4'>
        <ul className='labeled-list'>
          <li>
            <label>Company Name</label>
            <div>{shipper.company_name}</div>
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
            <div>{shipper.notes}</div>
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

ViewShipper.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  shipper: PropTypes.object,
  primaryContact: PropTypes.object,
}

function mapStateToProps (state, ownProps) {
  const shipperId = ownProps.match.params.shipperId
  const shipper = state.shippers[shipperId]
  let primaryContact = {}

  if (shipper) {
    const primaryContactId = shipper.primary_contact_id
    primaryContact = state.contacts[primaryContactId]
  }

  return {
    shipper,
    primaryContact,
  }
}

export default connect(mapStateToProps)(ViewShipper)