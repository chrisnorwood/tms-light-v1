import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { caseInsensitiveFilter } from '../utils/tableHelpers'
import NewContact from './modals/contacts/NewContact'
import ViewContact from './modals/contacts/ViewContact'
import EditContact from './modals/contacts/EditContact'
import DeleteContact from './modals/contacts/DeleteContact'

const ContactsPage = (props) => {
  const { contacts, match } = props
  const contactsArray = Object.values(contacts)

  const columns = [
    {
      Header: 'Contacts',
      headerClassName: 'text-left bg-grey-dark text-black text-2xl tracking-wide',
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
          headerClassName: 'bg-grey-light text-lg',
          maxWidth: 50,
        },
        {
          Header: 'Name',
          accessor: 'name',
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
          Header: 'Company',
          headerClassName: 'bg-grey-light text-lg',
          Cell: row => {
            const parentType = row.original.contactable_type.toLowerCase() + 's'
            const parentId = row.original.contactable_id
            const parentObj = props[parentType][parentId]
            const companyName = parentObj ? parentObj.company_name : 'Loading company name...'

            return (
              <Fragment>
                {companyName}
              </Fragment>
            )
          }
        },
        {
          Header: 'Actions',
          headerClassName: 'bg-grey-light text-lg',
          sortable: false,
          filterable: false,
          maxWidth: 150,
          Cell: row => (
            <div className='table-actions'>
              <Link to={`${match.path}/${row.original.id}/view`}>
                <button className='view'>
                  <FaEye />
                </button>
              </Link>
              <Link to={`${match.path}/${row.original.id}/edit`}>
                <button className='edit'>
                  <FaEdit />
                </button>
              </Link>
              <Link to={`${match.path}/${row.original.id}/delete`}>
                <button className='delete'>
                  <FaTrash />
                </button>
              </Link>
            </div>
          )
        }
      ]
    }
  ]

  return (
    <Fragment>
      <div className='flex mb-4 px-4 justify-end'>
        <Link to={`${match.path}/new`} className='new-item-btn'>
            <span className='flex items-center'><FaPlus className='inline mr-1' /> New Contact</span>
        </Link>
      </div>
      <div className='bg-white shadow-xl rounded-lg w-full p-4'>
        
        <ReactTable
          data={contactsArray}
          columns={columns}
          defaultPageSize={10}
          defaultFilterMethod={caseInsensitiveFilter}
          defaultSorted={[{ id: 'id', desc: true }]}
          className='-striped -highlight'
        />

        <Route path={`${match.path}/new`} render={(props) => (
          <NewContact {...props} closePath={match.path} />
        )} />
        
        <Route path={`${match.path}/:contactId/view`} render={(props) => (
          <ViewContact {...props} closePath={match.path}/>
        )} />

        <Route path={`${match.path}/:contactId/edit`} render={(props) => (
          <EditContact {...props} closePath={match.path}/>
        )} />

        <Route path={`${match.path}/:contactId/delete`} render={(props) => (
          <DeleteContact {...props} closePath={match.path}/>
        )} />
      </div>
    </Fragment>
  )
}

ContactsPage.propTypes = {
  match: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  carriers: PropTypes.object.isRequired,
  shippers: PropTypes.object.isRequired,
}

function mapStateToProps({ contacts, carriers, shippers }) {
  return {
    contacts,
    carriers,
    shippers,
  }
}

export default connect(mapStateToProps)(ContactsPage)