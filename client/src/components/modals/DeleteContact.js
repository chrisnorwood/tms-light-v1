import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleDeleteContact } from '../../actions/contacts'

class DeleteContact extends Component {
  handleDelete = (contactId) => {
    console.log('Try to delete Contact ID: ', contactId)
  
    this.props.dispatch(handleDeleteContact(contactId, this.props.history))
  }
  
  render() {
    const { closePath, contacts, match } = this.props
    const { contactId } = match.params
    const contact = contacts[contactId]

    if (!contact) return <div className='text-center text-xl'>That is not a valid contact.</div>

    return (
      <Fragment>
        <div className='border-b border-grey py-2 font-bold text-black text-center text-lg tracking-widest uppercase'>
          Are you sure?
        </div>
        <div className='m-4'>
          <h3 className='italic text-lg uppercase font-bold'>Delete:</h3>
          <p className='p-2'>
            <span className='italic pr-2'>ID:</span><span>{contact.id}</span>
            <br />
            <span className='italic pr-2'>Name:</span><span>{contact.name}</span>
          </p>
        </div>
        <div className='flex'>
          <Link
            to={closePath}
            className='bg-primary text-center w-1/2 p-4 mt-3 mx-2 text-sm text-white uppercase font-bold tracking-wider hover:bg-primary-dark disabled:opacity-75 disabled:cursor-not-allowed'
          >
            Cancel
          </Link>
          <button
            className='bg-red-700 w-1/2 p-4 mt-3 text-sm text-white uppercase font-bold tracking-wider hover:bg-red-800'
            onClick={() => this.handleDelete(contactId)}
          >
            Delete
          </button>
        </div>
      </Fragment>
    )
  }
}

DeleteContact.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closePath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps ({ contacts }) {
  return {
    contacts
  }
}

export default connect(mapStateToProps)(DeleteContact)