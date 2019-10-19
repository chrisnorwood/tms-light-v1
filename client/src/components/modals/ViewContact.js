import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class ViewContact extends Component {
  render() {
    const { closePath, contacts, match } = this.props
    const { contactId } = match.params
    const contact = contacts[contactId]

    if (!contact) return <div className='text-center text-xl'>That is not a valid contact.</div>

    return (
      <Fragment>
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
              <div>PARENT NAME HERE</div>
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
      </Fragment>
    )
  }
}

ViewContact.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  contacts: PropTypes.object.isRequired,
  carriers: PropTypes.object.isRequired,
  shippers: PropTypes.object.isRequired,
}

function mapStateToProps ({ contacts, carriers, shippers }) {
  return {
    contacts,
    carriers,
    shippers,
  }
}

export default connect(mapStateToProps)(ViewContact)