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
          <p className='p-2'>
            <div className='italic pr-2'>ID:</div>
            <div>{contact.id}</div>
            <br />
            <span className='italic pr-2'>Name:</span><span>{contact.name}</span>
          </p>
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
}

function mapStateToProps ({ contacts }) {
  return {
    contacts
  }
}

export default connect(mapStateToProps)(ViewContact)