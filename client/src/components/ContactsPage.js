import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { caseInsensitiveFilter } from '../utils/tableHelpers'
import ModalContainer from './modals/ModalContainer'
import NewContact from './modals/NewContact'

class ContactsPage extends Component {

  render() {
    const { contacts, match } = this.props
    const contactsArray = Object.values(contacts)

    const columns = [
      {
        Header: 'Contacts',
        headerClassName: 'text-left bg-grey-dark text-black text-2xl tracking-wide',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            filterable: true,
            headerClassName: 'bg-grey-light text-lg',
          },
          {
            Header: 'Phone',
            accessor: 'phone',
            headerClassName: 'bg-grey-light text-lg',
          },
          {
            Header: 'Email',
            accessor: 'email',
            headerClassName: 'bg-grey-light text-lg',
          },
          {
            Header: 'Notes',
            accessor: 'notes',
            headerClassName: 'bg-grey-light text-lg',
          },
          {
            Header: 'Type',
            accessor: 'contactable_type',
            headerClassName: 'bg-grey-light text-lg',
            maxWidth: 100,
          },
          {
            Header: 'Actions',
            headerClassName: 'bg-grey-light text-lg',
            sortable: false,
            filterable: false,
            maxWidth: 150,
            Cell: row => (
              <div className='table-actions'>
                <button className='view' onClick={() => console.log('View', row.original)}>
                  <FaEye />
                </button>
                <button className='edit' onClick={() => console.log('Edit', row.original)}>
                  <FaEdit />
                </button>
                <button className='delete' onClick={() => console.log('Delete', row.original)}>
                  <FaTrash />
                </button>
              </div>
            )
          }
        ]
      }
    ]

    return (
      <div className='bg-white shadow-xl rounded-lg w-full p-6'>
        <div className='flex mb-4 justify-end'>
          <Link to={`${match.path}/new`} className='new-item-btn'>
              <span className='flex items-center'><FaPlus className='inline mr-1' /> New Contact</span>
          </Link>
        </div>
        <ReactTable
          data={contactsArray}
          columns={columns}
          defaultPageSize={10}
          defaultFilterMethod={caseInsensitiveFilter}
          className='-striped -highlight'
        />

        <Route path={`${match.path}/new`} render={() => (
          <ModalContainer {...this.props}>
            <NewContact {...this.props} />
          </ModalContainer>
        )} />
      </div>
    )
  }
}

ContactsPage.propTypes = {
  match: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired
}

function mapStateToProps({ contacts }) {
  return {
    contacts
  }
}

export default connect(mapStateToProps)(ContactsPage)